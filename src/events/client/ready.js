const { Events , ActivityType } = require('discord.js');

module.exports = {
  name : Events.ClientReady,
  once : true,
  execute(client) {
    try{

      client.user.setPresence(
        {
          activities: [{
            name : 'to dope ass music',
            type: ActivityType.Listening
          }],
          status: 'available'
        }
      );
      client.vulkava.start(client.user.id);
      console.log(`Client is ready, logged in as ${client.user.tag}`);
    }
    catch(err){
      console.error(err);
    }
  },
};
