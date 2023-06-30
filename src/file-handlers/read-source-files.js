const fs = require('node:fs');
const path = require('node:path');

module.exports = function readSourceFiles(dirname, dirPath, callback){
  const foldersPath = path.join(dirname, dirPath);
  const files = fs.readdirSync(foldersPath);

  for(const file of files){
    const filePath = path.join(foldersPath, file);
    const stats = fs.statSync(filePath);
    if(stats.isFile()){
      if(file.endsWith('.js')){
        const object = require(filePath);
        try{
          callback(object);
        }
        catch(err){
          console.error(err);
        }
      }
    }
    else if(stats.isDirectory()){
      readSourceFiles("",filePath,callback);
    }
  }
}
