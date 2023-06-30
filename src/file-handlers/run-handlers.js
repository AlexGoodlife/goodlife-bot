const fs = require('node:fs');
const path = require('node:path');
const { readSourceFiles } = require('./read-source-files.js');

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

    // const handlersPath = path.join(__dirname, './handlers/');
    // const handlersFiles = fs.readdirSync(handlersPath).filter(file => file.endsWith('.js'));
    //
    // for (const file of handlersFiles) {
    //   const filePath = path.join(handlersPath, file);
    //   const handler = require(filePath);
    //
    //   // gotta pass in the client for raw sry
    //   if( "run" in handler){
    //     try{
    //       handler.run(client);
    //     }catch(err){
    //       console.error(err);
    //     }
    //   }
    // }
  }
}

