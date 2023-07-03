const { ActionRowBuilder, ButtonBuilder , EmbedBuilder, ButtonStyle } = require('discord.js');
const { embedColor } = require('../../../config.json');
const timeFormat = require('../../util/time-format');
const buildButtons = require('../../util/dash-buttons.js');

module.exports = {
  vulkava : true,
  name : "trackStart",
  async execute(client, player, track){
    if(client.waitTimeout != null){
      clearTimeout(client.waitTimeout);
      client.waitTimeout = null;
    } 
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

    const message = await channel.send({embeds : [embed], components : [buildButtons(player)]});
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
