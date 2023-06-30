const { ActionRowBuilder, ButtonBuilder , EmbedBuilder, ButtonStyle } = require('discord.js');
const { embedColor } = require('../../../config.json');

module.exports = {
  vulkava : true,
  name : "trackStart",
  async execute(client, player, track){
    const channel = client.channels.cache.get(player.textChannelId);

    const thumbnailUrl = client.guilds.cache.get(player.guildId).iconURL();
    const songImageUrl = track.thumbnail;
    const embed = new EmbedBuilder()
    .setAuthor({name : 'Now playing!', iconURL: thumbnailUrl})
    .setTitle(`${track.title}`)
    .setColor(embedColor)
    .setThumbnail(songImageUrl)
    .setTimestamp();

    const playEmoji = "⏸️";
    const stopEmoji = "⏹️";
    const skipEmoji = "⏭️";
    const buttons  = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId('pauseButton')
        .setStyle(ButtonStyle.Primary)
        .setEmoji(playEmoji),
      new ButtonBuilder()
        .setCustomId('skipButton')
        .setEmoji(skipEmoji)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('stopButton')
        .setStyle(ButtonStyle.Danger)
        .setEmoji(stopEmoji),
     );

    const message = await channel.send({embeds : [embed], components : [buttons]});
    if(client.lastTrack){
      try{
        await client.lastTrack.delete();
      }
      catch(err){
        console.error(err);
      }
    }
    client.lastTrack = message;

  }
}
