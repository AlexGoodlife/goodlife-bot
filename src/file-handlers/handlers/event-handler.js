const { readSourceFiles } = require('../read-source-files.js');

module.exports = {
  run : (client) =>{
    readSourceFiles(__dirname, '../../events/', (event) =>{
      if(event.name == "raw"){
        client.on(event.name, (...args) => event.execute(client, ...args));
        return;
      }

      if(event.vulkava){
        if(event.once){
          client.vulkava.once(event.name, (...args) => event.execute(client,...args));
        }
        else{
          client.vulkava.on(event.name, (...args) => event.execute(client,...args));
        }

      }
      else{
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
        } else {
          client.on(event.name, (...args) => event.execute(...args));
        }
      }

    });
  },
}
