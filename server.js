const path = require("path");
const { createServer } = require("http");
const { parse } = require("url");

const dir = path.join(__dirname);
process.env.NODE_ENV = "production";
process.chdir(__dirname);

const nextConfigStr = require("fs").readFileSync(
  path.join(__dirname, ".next", "required-server-files.json"),
  "utf8"
);
const { config: nextConfig } = JSON.parse(nextConfigStr);
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
