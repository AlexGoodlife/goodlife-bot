const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
  vulkava : true,
  name : "trackStart",
  execute(client, player, track){
    const channel = client.channels.cache.get(player.textChannelId);

    const thumbnailUrl = client.guilds.cache.get(player.guildId).iconURL();
    const embed = new EmbedBuilder()
    .setAuthor({name : 'Now playing!', iconURL: thumbnailUrl})
    .setTitle(`${track.title}`)
    .setColor(embedColor)
    channel.send({embeds : [embed]});

    // channel.send(`Now playing \`${track.title}\``);
  }
}
