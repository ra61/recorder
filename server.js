
/**
 * NodeJs Server-Side Example for Fine Uploader (traditional endpoints).
 * Maintained by Widen Enterprises.
 *
 * This example:
 *  - handles non-CORS environments
 *  - handles delete file requests assuming the method is DELETE
 *  - Ensures the file size does not exceed the max
 *  - Handles chunked upload requests
 *
 * Requirements:
 *  - express (for handling requests)
 *  - rimraf (for "rm -rf" support)
 *  - multiparty (for parsing request payloads)
 *  - mkdirp (for "mkdir -p" support)
 */
const onUpload = require("./business/onUpload");
const onDeleteFile = require("./business/onDeleteFile");
// Dependencies
const express = require("express"),
    path = require("path"),
    app = express(),

    // paths/constants
    publicDir = process.env.PUBLIC_DIR || path.join(__dirname, 'public'),
    nodeModulesDir = process.env.NODE_MODULES_DIR || path.join(__dirname, 'node_modules'),
    port = process.env.SERVER_PORT || 3000;

app.listen(port, function () {
    console.log('Listening on port:' + port);
});

// routes
app.use(express.static(publicDir));
app.use("/node_modules", express.static(nodeModulesDir));
app.post("/uploads", onUpload);
app.delete("/uploads/:uuid", onDeleteFile);
