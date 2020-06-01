var fs = require("fs");
var async = require("async");
let path = "D:\\gameWork\\bl_client\\code\\bin-release\\web\\1\\";
let data = fs.readFileSync(path + "manifest.json");
let json = JSON.parse(data);
let str = "";
function deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};


async.eachSeries(json.initial.concat(json.game), (jsonName, callback)=>{
    console.log(path + jsonName);
    let dara = fs.readFileSync(path + jsonName);
    str += '//' + jsonName + "\n";
    str += dara.toString() + "\n\n";
    callback();
}, ()=>{
    deleteFolderRecursive(path + "libs/");
    deleteFolderRecursive(path + "promise/");
    // fs.rmdirSync(path + "libs/");
    fs.unlinkSync(path + "main.min.js");
    // console.log(str);
    fs.writeFileSync(path + "core.js", str);
    // //修改manifest.json
    // // return;
    json.initial = [];
    json.game = ["core.js"];
    fs.writeFileSync(path +  "manifest.json", JSON.stringify(json, null, 4));
});