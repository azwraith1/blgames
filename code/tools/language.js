var xlsx = require("node-xlsx");
var fs = require("fs");
let fileName = "./国际化文本.xlsx";
var list = xlsx.parse(fileName);
console.log(list);
let xlsxData = list[0].data;

let jsonData = {};

let title = xlsxData[1];

for(let i = 2; i < xlsxData.length; i++){
   let cowData = xlsxData[i];
   let jsonItemData = {};
    for(let j = 1; j < title.length; j ++){
        jsonItemData[title[j]] = cowData[j];
    }
    jsonData[cowData[0]] = jsonItemData;
}
fs.writeFile("./language.json", JSON.stringify(jsonData));
