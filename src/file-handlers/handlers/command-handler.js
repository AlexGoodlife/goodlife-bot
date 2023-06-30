const { Collection } = require('discord.js');
const { readSourceFiles } = require('../read-source-files.js');

module.exports = {
  run : (client) =>{

    client.commands = new Collection();

    readSourceFiles(__dirname, '../../commands/', (command) =>{
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`Set command with name ${command.data.name}`);
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }

    })
  },
}
