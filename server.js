const path = require("path");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(process.env.PORT || 3000, () => {
    console.log("> Ready");
  });
});
