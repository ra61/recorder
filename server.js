

const express = require("express"),
    path = require("path"),
    app = express(),

    // paths/constants
    publicDir = process.env.PUBLIC_DIR || path.join(__dirname, 'public'),
    port = process.env.SERVER_PORT || 3000;

const onUpload = require("./modules/onUpload");
const onDeleteFile = require("./modules/onDeleteFile");

// 静态资源托管
app.use(express.static(publicDir));
// 监听端口
app.listen(port, function () {
    console.log('Listening on port:' + port);
});


// routes
app.use(express.static(publicDir));
app.post("/uploads", onUpload);
app.delete("/uploads/:uuid", onDeleteFile);