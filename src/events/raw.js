const { Events } = require('discord.js');

module.exports = {
  name : Events.Raw,
  execute(client, packet){
    client.vulkava.handleVoiceUpdate(packet);
    // console.log("packet");
  }
}
