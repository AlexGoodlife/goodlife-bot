const { Events } = require('discord.js');

module.exports = {
  name : Events.ClientReady,
  once : true,
  execute(client) {
    try{

      client.vulkava.start(client.user.id);
      console.log(`Client is ready, logged in as ${client.user.tag}`);
    }
    catch(err){
      console.error(err);
    }
  },
};
