const path = require("path");
const fs = require("fs");

const dir = path.join(__dirname);
process.env.NODE_ENV = "production";
process.chdir(__dirname);

// Read config from the standalone build and fix paths at runtime
const configPath = path.join(__dirname, ".next", "required-server-files.json");
const { config: nextConfig } = JSON.parse(fs.readFileSync(configPath, "utf8"));

// Fix build machine paths (Windows or CI) to actual server path
if (nextConfig.outputFileTracingRoot) {
  nextConfig.outputFileTracingRoot = dir;
}
if (nextConfig.turbopack && nextConfig.turbopack.root) {
  nextConfig.turbopack.root = dir;
}

// Set the fixed config for Next.js internals
process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig);

// Use the correct standalone API: startServer (NOT the next() constructor)
require("next");
const { startServer } = require("next/dist/server/lib/start-server");

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || "0.0.0.0";

startServer({
  dir,
  isDev: false,
  config: nextConfig,
  hostname,
  port,
  allowRetry: false,
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
