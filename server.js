
const onUpload = require("./modules/onUpload");
const onDeleteFile = require("./modules/onDeleteFile");
// Dependencies
const express = require("express"),
    path = require("path"),
    app = express(),
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
