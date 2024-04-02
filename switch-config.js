/* eslint-disable no-undef */
import fs from "fs";
import path from "path";
import { loadEnv } from "vite";

const mode = process.env.NODE_ENV || "development"; // Adjust as needed
const env = loadEnv(mode, process.cwd(), "");

const version = env.VITE_STYLE_VERSION || "v1";
const configFileContent = `import config from './tailwind.config.${version}';\n\nexport default config;\n`;

fs.writeFileSync(path.resolve(process.cwd(), "tailwind.config.ts"), configFileContent);
console.log(`Switched Tailwind config to version: ${version}`);
