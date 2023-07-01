const {Client, GatewayIntentBits } = require('discord.js');
const { token, nodes } = require('./config.json');
const { Vulkava } = require('vulkava');
const handlers = require('./src/file-handlers/run-handlers.js');

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

client.lastTrack = null;
client.waitTimeout = null;

handlers.run(client);

client.login(token);
