const core = require('@actions/core');
const fs = require('fs');
const path = require('path');
const { PinataSDK } = require('pinata');

async function run() {
  try {
    // Get inputs
    const pinataJwt = core.getInput('pinata-jwt');
    const sourceDir = core.getInput('source-dir');
    const pinName = core.getInput('pin-name');
    const updateExisting = core.getInput('update-existing') === 'true';

    // Initialize Pinata SDK v2
    const pinata = new PinataSDK({
      pinataJwt: pinataJwt
    });

    // Test authentication
    try {
      await pinata.testAuthentication();
      console.log('✅ Pinata authentication successful');
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }

    // Check if source directory exists
    if (!fs.existsSync(sourceDir)) {
      throw new Error(`Source directory ${sourceDir} does not exist`);
    }

    // If updating existing, try to find and remove old version
    if (updateExisting) {
      try {
        const existingFiles = await pinata.files.public.list()
          .name(pinName)
          .limit(1);
        
        if (existingFiles.files && existingFiles.files.length > 0) {
          const oldFile = existingFiles.files[0];
          console.log(`🗑️ Removing old version: ${oldFile.cid}`);
          await pinata.files.public.delete([oldFile.id]);
        }
      } catch (error) {
        console.log('⚠️ Could not remove old version:', error.message);
      }
    }

    // Create file array by reading all files
    const files = await getAllFiles(sourceDir);
    console.log(`📁 Found ${files.length} files to upload`);

    // Upload directory to IPFS using v2 SDK
    console.log('🚀 Uploading to IPFS...');
    
    const result = await pinata.upload.public.fileArray(files)
      .name(pinName)
      .keyvalues({
        'deployment': 'github-actions',
        'repository': process.env.GITHUB_REPOSITORY || 'unknown',
        'commit': process.env.GITHUB_SHA || 'unknown',
        'branch': process.env.GITHUB_REF_NAME || 'unknown',
        'timestamp': new Date().toISOString()
      });

    console.log('✅ Upload successful!');
    console.log(`📍 IPFS Hash: ${result.cid}`);
    console.log(`🌍 Gateway URL: https://gateway.pinata.cloud/ipfs/${result.cid}`);

    // Set outputs for GitHub Actions
    core.setOutput('ipfs-hash', result.cid);
    core.setOutput('gateway-url', `https://gateway.pinata.cloud/ipfs/${result.cid}`);
    core.setOutput('pin-id', result.id);
    core.setOutput('pin-name', result.name);

    // Create a detailed summary
    await core.summary
      .addHeading('🎉 IPFS Deployment Successful!')
      .addTable([
        ['Property', 'Value'],
        ['IPFS Hash (CID)', result.cid],
        ['Gateway URL', `https://gateway.pinata.cloud/ipfs/${result.cid}`],
        ['Pin Name', result.name || pinName],
        ['Pin ID', result.id],
        ['Files Uploaded', files.length.toString()],
        ['Upload Size', formatBytes(result.size || 0)],
        ['Upload Date', new Date(result.created_at).toLocaleString('en-US')],
        ['Repository', process.env.GITHUB_REPOSITORY || 'N/A'],
        ['Commit', process.env.GITHUB_SHA ? process.env.GITHUB_SHA.substring(0, 8) : 'N/A']
      ])
      .addDetails(
        'Upload Details',
        `
**Network:** ${result.network || 'public'}
**MIME Type:** ${result.mime_type || 'N/A'}
**Number of Files:** ${result.number_of_files || files.length}
**Vectorized:** ${result.vectorized ? 'Yes' : 'No'}

**Access your content at:** https://gateway.pinata.cloud/ipfs/${result.cid}
        `.trim()
      )
      .write();

    console.log('📋 Summary created successfully');

  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    core.setFailed(`Action failed: ${error.message}`);
  }
}

async function getAllFiles(dirPath, arrayOfFiles = [], basePath = '') {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      const subPath = basePath ? path.join(basePath, file) : file;
      arrayOfFiles = await getAllFiles(fullPath, arrayOfFiles, subPath);
    } else {
      try {
        // Read file content
        const fileContent = fs.readFileSync(fullPath);
        
        // Create relative path for the file
        const relativePath = basePath ? path.join(basePath, file) : file;
        
        // Create File object with proper path and MIME type
        const fileObj = new File([fileContent], relativePath, {
          type: getMimeType(file)
        });

        arrayOfFiles.push(fileObj);
        console.log(`📄 Added file: ${relativePath} (${formatBytes(stat.size)})`);
        
      } catch (error) {
        console.warn(`⚠️ Could not read file ${fullPath}: ${error.message}`);
      }
    }
  }

  return arrayOfFiles;
}

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    // Web files
    '.html': 'text/html',
    '.htm': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.json': 'application/json',
    '.xml': 'application/xml',
    
    // Images
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    
    // Documents
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.rtf': 'application/rtf',
    
    // Fonts
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    
    // Archives
    '.zip': 'application/zip',
    '.tar': 'application/x-tar',
    '.gz': 'application/gzip',
    
    // Media
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg'
  };

  return mimeTypes[ext] || 'application/octet-stream';
}

function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Run the main function
run();