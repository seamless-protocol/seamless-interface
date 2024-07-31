import { spawn } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Helper variables to determine the current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.development
dotenv.config({ path: path.resolve(__dirname, ".env.development") });

const forkUrl = process.env.VITE_BASE_RPC_FREE_1;

if (!forkUrl) {
  console.error("Error: VITE_BASE_RPC_FREE_1 is not defined in .env.development");
  process.exit(1);
}

const pkillCommand = `pkill -f anvil || true`; // The '|| true' part ensures the script continues even if pkill fails
const anvilCommand = `anvil --fork-url ${forkUrl}`;

// Kill existing anvil process
spawn(pkillCommand, { shell: true }).on("close", (code) => {
  if (code !== 0 && code !== 1) {
    // Allow code 1 for 'no processes found'
    console.error(`pkill command failed with code ${code}`);
    return;
  }

  // Start anvil
  const anvilProcess = spawn(anvilCommand, { shell: true });

  anvilProcess.stdout.on("data", (data) => {
    console.log(`anvil stdout: ${data}`);
  });

  anvilProcess.stderr.on("data", (data) => {
    console.error(`anvil stderr: ${data}`);
  });

  anvilProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(`anvil process exited with code ${code}`);
    }
  });
});
