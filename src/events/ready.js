const { Events } = require('discord.js');

module.exports = {
  name : Events.ClientReady,
  once : true,
  execute(client) {
    console.log(`Client is ready, logged in as ${client.user.tag}`);
    try{

      client.vulkava.start(client.user.id);
    }
    catch(err){
      console.error(err);
    }
  },
};
