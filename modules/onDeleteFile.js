
const rimraf = require("rimraf");
const path = require("path");
const uploadedFilesPath = process.env.UPLOADED_FILES_DIR || path.join(__dirname, '../uploadedFiles/');

function onDeleteFile(req, res) {
    var uuid = req.params.uuid,
        dirToDelete = uploadedFilesPath + uuid;

    rimraf(dirToDelete, function (error) {
        if (error) {
            console.error("Problem deleting file! " + error);
            res.status(500);
        }

        res.send();
    });
}

module.exports = onDeleteFile;