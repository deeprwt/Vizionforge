const path = require("path");
const { createServer } = require("http");
const { parse } = require("url");

const dir = path.join(__dirname);
process.env.NODE_ENV = "production";
process.chdir(__dirname);

// Read config from the standalone build and fix Windows paths
const configPath = path.join(__dirname, ".next", "required-server-files.json");
const { config: nextConfig } = JSON.parse(require("fs").readFileSync(configPath, "utf8"));

// Fix Windows paths that were baked in during build
if (nextConfig.outputFileTracingRoot) {
  nextConfig.outputFileTracingRoot = dir;
}
if (nextConfig.turbopack && nextConfig.turbopack.root) {
  nextConfig.turbopack.root = dir;
}

process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig);

const next = require("next");
const app = next({ dev: false, dir: dir, conf: nextConfig });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const port = parseInt(process.env.PORT, 10) || 3000;
  const hostname = process.env.HOSTNAME || "0.0.0.0";
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(port, hostname, () => {
    console.log("> Ready on http://" + hostname + ":" + port);
  });
});
