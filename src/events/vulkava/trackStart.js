const { ActionRowBuilder, ButtonBuilder , EmbedBuilder, ButtonStyle } = require('discord.js');
const { embedColor } = require('../../../config.json');

module.exports = {
  vulkava : true,
  name : "trackStart",
  async execute(client, player, track){
    const channel = client.channels.cache.get(player.textChannelId);

    const thumbnailUrl = client.guilds.cache.get(player.guildId).iconURL();
    const songImageUrl = track.thumbnail;
    let currentDate = new Date(0);
    currentDate.setSeconds(player.current.duration/ 1000);
    let currentTimeString = currentDate.toISOString().substring(11, 19);
    const embed = new EmbedBuilder()
    .setAuthor({name : 'Now playing!', iconURL: thumbnailUrl})
    .setTitle(`${track.title}`)
    .setColor(embedColor)
    .setThumbnail(songImageUrl)
    .setFields([
      {
        name: 'Requested by:',
        value: track.requester.toString(),
        inline: true
      },
      {
        name: 'Length',
        value: currentTimeString,
        inline: true
      }
    ])
    .setTimestamp();

    const playEmoji = "⏸️";
    const stopEmoji = "⏹️";
    const skipEmoji = "⏭️";
    const loopEmoji = "🔁";
    let loopStyle = player.trackRepeat ? ButtonStyle.Danger : ButtonStyle.Primary; 
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
      new ButtonBuilder()
        .setCustomId('loopButton')
        .setStyle(loopStyle)
        .setEmoji(loopEmoji),
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
