
const { EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.json');
module.exports = {
  vulkava : true,
  name : "queueEnd",
  async execute(client, player){
    const channel = client.channels.cache.get(player.textChannelId);

    const thumbnailUrl = client.guilds.cache.get(player.guildId).iconURL();
    const embed = new EmbedBuilder()
    .setAuthor({name : 'Queue is done!', iconURL: thumbnailUrl})
    .setColor(embedColor)
    .setTimestamp();
    await channel.send({embeds : [embed]});

    if(client.lastTrack){
      try{
        await client.lastTrack.delete();
        client.lastTrack = null;

      }catch(err){
        console.error(err);
      }
    }

    player.destroy();
  }
}
