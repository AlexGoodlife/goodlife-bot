const {Client,Collection, GatewayIntentBits } = require('discord.js');
const { token, nodes } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const { Vulkava } = require('vulkava');

const client = new Client(
  { 
    intents : 
    [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates
    ]
  }
);

client.vulkava = new Vulkava({
  nodes : nodes,
  sendWS: (guildId, payload) =>{
    client.guilds.cache.get(guildId)?.shard.send(payload);
  }

});

client.commands = new Collection();

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
			client.commands.set(command.data.name, command);
      console.log(`Set command with name ${command.data.name}`);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

  // gotta pass in the client for raw sry
  if(event.name == "raw"){
    client.on(event.name, (...args) => event.execute(client, ...args));
    continue;
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
}

client.login(token);
