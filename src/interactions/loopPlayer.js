
const { EmbedBuilder, bold } = require('discord.js');
const { embedColor } = require('../../config.json');
const timeFormat = require('../util/time-format.js');

module.exports = {
  async loopPlayer(interaction){
    const client = interaction.client;
    let response = new EmbedBuilder().setColor(embedColor);

    if(!interaction.member.voice) {
      response.setDescription(`You need to join a voice channel first`);
      await interaction.reply({ embeds : [response], ephemeral: true});
      return null;
    }

    const player = client.vulkava.players.get(interaction.guild.id);
    if(!player) {
      response.setDescription(`There is no player for this guild`);
      await interaction.reply({ embeds : [response], ephemeral: true});
      return null;
    } 

    if(player.voiceChannelId != interaction.member.voice.channelId) {
      response.setDescription(`You are not in the same voice channel as me`);
      await interaction.reply({ embeds : [response], ephemeral: true});
      return null;
    } 

    if(!player.current){
      response.setDescription(`Queue is empty`);
      await interaction.reply({ embeds : [response], ephemeral: true});
      return null;
    } 

    let responseString = 'on';
    if(player.trackRepeat){
      responseString = 'off';

    }
    player.setTrackLoop(!player.trackRepeat);
    // const title = player.current.title;
    // const iconUrl = interaction.member.user.avatarURL();
    response.setDescription(`Looping was turned ${bold(responseString)} by ${interaction.member.toString()}`)
    if(player.trackRepeat){
      const currentTimeString = timeFormat(player.current.duration);
      response.setFields(
        {
          name: 'Current track',
          value: `${player.current.title}`
        },
        {
          name: 'Length',
          value: currentTimeString 
        }
      );
      response.setThumbnail(player.current.thumbnail);
    }
    // response.setAuthor({name : `Looping is turned ${responseString}`, iconURL : iconUrl});
    await interaction.reply({ embeds : [response]});
    return player;
  }
}
