const {Client, GatewayIntentBits } = require('discord.js');
const { token, nodes } = require('./config.json');
const { Vulkava } = require('vulkava');
const handlers = require('./src/handlers.js');

const client = new Client(
  { 
    intents : 
    [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildEmojisAndStickers
    ]
  }
);

client.vulkava = new Vulkava({
  nodes : nodes,
  sendWS: (guildId, payload) =>{
    client.guilds.cache.get(guildId)?.shard.send(payload);
  }

});

handlers.loadCommands(client);
handlers.loadEvents(client);
handlers.loadButtons(client);

client.login(token);
