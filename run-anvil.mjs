import { spawn } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Helper variables to determine the current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.development
dotenv.config({ path: path.resolve(__dirname, ".env.development") });

const forkUrl = process.env.VITE_CYPRESS_TESTONLY_FORK_RPC;
const forkBlockNumber = process.env.VITE_CYPRESS_ANVIL_FORK_BLOCK_NUMBER;

if (!forkUrl) {
  console.error("Error: VITE_CYPRESS_TESTONLY_FORK_RPC is not defined in .env.development");
  process.exit(1);
}

const anvilCommand = `anvil --fork-url ${forkUrl} --fork-block-number ${forkBlockNumber} --auto-impersonate --no-rate-limit`;

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
