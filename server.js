const path = require("path");

// Change working directory to standalone folder
process.chdir(path.join(__dirname, ".next", "standalone"));

// Start the standalone Next.js server
require(path.join(__dirname, ".next", "standalone", "server.js"));
