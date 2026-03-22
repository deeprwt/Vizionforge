const path = require("path");

// Set the directory for Next.js standalone
process.chdir(path.join(__dirname, ".next", "standalone"));

// Start the standalone server
require("./.next/standalone/server.js");
