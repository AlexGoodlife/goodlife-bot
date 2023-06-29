const { Events } = require('discord.js');

module.exports = {
  name : Events.ClientReady,
  once : true,
  execute(client) {
    try{

      client.vulkava.start(client.user.id);
      console.log(`Client is ready, logged in as ${client.user.tag}`);
      client.user.setStatus('available');
      client.user.setPresence({
        activity: {
          name: "Lets fucking go"
        }
      });
    }
    catch(err){
      console.error(err);
    }
  },
};
