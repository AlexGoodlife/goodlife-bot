const { Collection } = require('discord.js');
const { readSourceFiles } = require('../read-source-files.js');

module.exports = {
  run : (client) =>{
    client.buttons = new Collection();
    readSourceFiles(__dirname,'../../buttons/', (button) =>{
      if('id' in button && 'execute' in button){
        client.buttons.set(button.id, button);
        console.log(`Loaded Button: ${button.id}`);
      }
      else{
        console.log(`[WARNING] The button at ${filePath} is missing a required "id" or "execute" property.`);
      }
    });
  },
}
