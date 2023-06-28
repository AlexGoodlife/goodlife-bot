const { EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
  vulkava : true,
  name : "trackStuck",
  execute(client, player, track, thresholdMs){
    const channel = client.channels.cache.get(player.textChannelId);

    const embed = new EmbedBuilder().setDescription(`Track got stuck : ${track.title} after ${thresholdMs}, skipping`);
    embed.setColor(embedColor);
    channel.send({embeds : [embed]});
    player.skip(); 
  }
}
