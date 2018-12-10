
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
const onUpload = require("./modules/onUpload");
const onDeleteFile = require("./modules/onDeleteFile");
// Dependencies
const express = require("express"),
    path = require("path"),
    app = express(),
	multer = require("multer"),
	upload = multer({ dest: 'uploadedFiles/' }),
    // paths/constants
    publicDir = process.env.PUBLIC_DIR || path.join(__dirname, 'public'),
    nodeModulesDir = process.env.NODE_MODULES_DIR || path.join(__dirname, 'node_modules'),
    port = process.env.SERVER_PORT || 3000;
	
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.listen(port, function () {
    console.log('Listening on port:' + port);
});

// routes
app.use(express.static(publicDir));
app.use("/node_modules", express.static(nodeModulesDir));
app.post("/uploads", onUpload);
app.delete("/uploads/:uuid", onDeleteFile);

app.post('/onAudioUpload', upload.single('file'), function (req, res, next) {

    console.log(req.file);
    if (req.file === undefined) {
        res.json({
            "code": 0,
            "message": "请把file name设置为file",
            "data": null
        });
    } else {
        res.json({
            "code": 1,
            "message": "success",
            "data": req.file
        })
    }
});
