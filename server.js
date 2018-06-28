const express = require("express"),
    path = require("path"),
    app = express(),

    // paths/constants
    publicDir = process.env.PUBLIC_DIR || path.join(__dirname, 'public'),
    port = process.env.SERVER_PORT || 3000;

// 静态资源托管
app.use(express.static(publicDir));
// 监听端口
app.listen(port, function () {
    console.log('Listening on port:' + port);
});
