const { ActionRowBuilder, ButtonBuilder , EmbedBuilder, ButtonStyle } = require('discord.js');
const { embedColor } = require('../../../config.json');
const timeFormat = require('../../util/time-format');

module.exports = {
  vulkava : true,
  name : "trackStart",
  async execute(client, player, track){
    const channel = client.channels.cache.get(player.textChannelId);

    const thumbnailUrl = client.guilds.cache.get(player.guildId).iconURL();
    const songImageUrl = track.thumbnail;
    const currentTimeString = timeFormat(player.current.duration);
    const embed = new EmbedBuilder()
    .setAuthor({name : 'Now playing!', iconURL: thumbnailUrl})
    .setTitle(`${track.title}`)
    .setURL(track.uri)
    .setColor(embedColor)
    .setThumbnail(songImageUrl)
    .setFields([
      {
        name: 'Author',
        value: track.author,
        inline: true
      },
{ name: '\u200b', value: '\u200b',inline:true },
      {
        name: 'Length',
        value: currentTimeString,
        inline: true
      },
      {
        name: 'Requested by',
        value: track.requester.toString(),
      }
    ])
    .setTimestamp();

    const playEmoji = "⏸️";
    const stopEmoji = "⏹️";
    const skipEmoji = "⏭️";
    const loopEmoji = "🔁";
    let loopStyle = player.trackRepeat ? ButtonStyle.Danger : ButtonStyle.Secondary; 
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
