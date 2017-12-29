var multer = require('multer');
var fs = require('fs');
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/drive/"+req.user.userId+"/");
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);  //file.fieldname + "_" + Date.now() + "_" +
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3);

function createDirIfNotExist(dir) {
    if (!fs.existsSync(dir)){
        console.log("Making Directory");
        fs.mkdirSync(dir);
    }
}

module.exports.myFiles= function (req,res,next) {
    var dir = './public/drive/'+req.user.userId;
    createDirIfNotExist(dir);
    var files=[];
    fs.readdirSync(dir).forEach(file => {
        files.push({name:file,path:"/drive/"+req.user.userId+"/"+file});
    });
    //var files=[{name:"a.txt",path:"images/img_avatar1.png"},{name:"b.txt",path:"images/img_avatar1.png"},{name:"c.txt",path:"images/img_avatar1.png"}];
    res.render('myFiles',{files:files,user:JSON.parse(req.user.userDetails)});
}

module.exports.fileUpload= function (req,res,next) {
    createDirIfNotExist('./public/drive/'+req.user.userId);
    upload(req, res, function(err) {

        if (err) {
            console.log(err);
            return res.end("Something went wrong!");

        }
        module.exports.myFiles(req,res,next);
    });
};