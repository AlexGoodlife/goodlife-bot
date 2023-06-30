const fs = require('node:fs');
const path = require('node:path');
const readSourceFiles = require('./read-source-files.js');

module.exports = {
  run: (client) =>{
    readSourceFiles(__dirname,'./handlers/', (handler) =>{
      if("run" in handler){
        handler.run(client);
      }
      else{
        console.log("[Warning] handler has no run function");
      }
    });
  }
}

