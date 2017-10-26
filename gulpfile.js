// require("./gulp/test.js");
// 
// 
const fs = require("fs-extra"); // 也可以使用fs-extra模块进行操作
let readPath = __dirname + "/gulp";
// fs.readdir(readPath, function(err, files){
// 	if(err){
// 		throw new Error("获取gulp文件夹失败，请检查");
// 	}
// 	files.map(function(fileName){
// 		console.log(fileName);
// 		require("./gulp/" + fileName);
// 	});
// });
fs.readdirSync(readPath).map(function(fileName){
	if(fileName.endsWith(".js")){
		require("./gulp/" + fileName);
	}
});