const { REST, Routes } = require('discord.js');
const { token, guildID, clientID } = require('./config.json');
const readSourceFiles = require('./src/file-handlers/read-source-files.js');

const commands = [];
const privateCommands = [];

readSourceFiles(__dirname, 'src/commands', (command) =>{
  if ('data' in command && 'execute' in command) {
    if(command.private){
      privateCommands.push(command.data.toJSON());
      console.log(`Deploying private command with name : ${command.data.name}`);
    }
    else{
      commands.push(command.data.toJSON());
      console.log(`Deploying command with name : ${command.data.name}`);
    }
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
});

const rest = new REST().setToken(token);

(async () =>{
  try{
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationCommands(clientID),
      { body : commands}
    );

    const privateData = await rest.put(
      Routes.applicationGuildCommands(clientID, guildID),
      { body : privateCommands}
    );
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		console.log(`Successfully reloaded ${privateData.length} private application (/) commands.`);
  }catch(error){
    console.error(error);
  }
})();
