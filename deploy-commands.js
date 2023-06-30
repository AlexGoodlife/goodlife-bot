const { REST, Routes } = require('discord.js');
const { token, guildID, clientID } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const { exit } = require('node:process');

const commands = [];
const privateCommands = [];


const foldersPath = path.join(__dirname, 'src/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
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
	}
}

const rest = new REST().setToken(token);
// TO DELETE COMMANDS I HAVE TO THIS WAY
// rest.delete(Routes.applicationCommand(clientID, '1124083903553089566'))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);


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
