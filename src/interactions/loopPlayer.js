
const { EmbedBuilder, bold } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
  async loopPlayer(interaction){
    const client = interaction.client;
    let response = new EmbedBuilder().setColor(embedColor);

    if(!interaction.member.voice) {
      response.setDescription(`You need to join a voice channel first`);
      return await interaction.reply({ embeds : [response], ephemeral: true});
    }

    const player = client.vulkava.players.get(interaction.guild.id);
    if(!player) {
      response.setDescription(`There is no player for this guild`);
      return await interaction.reply({ embeds : [response], ephemeral: true});
    } 

    if(player.voiceChannelId != interaction.member.voice.channelId) {
      response.setDescription(`You are not in the same voice channel as me`);
      return await interaction.reply({ embeds : [response], ephemeral: true});
    } 

    if(!player.current){
      response.setDescription(`Queue is empty`);
      return await interaction.reply({ embeds : [response], ephemeral: true});
    } 

    let responseString = 'on';
    if(player.trackRepeat){
      responseString = 'off';

    }
    player.setTrackLoop(!player.trackRepeat);
    const title = player.current.title;
    const iconUrl = interaction.member.user.avatarURL();
    response.setDescription(`Looping was turned ${bold(responseString)} by ${interaction.member.toString()}`)
    if(player.trackRepeat){
      let currentDate = new Date(0);
      currentDate.setSeconds(player.current.duration/ 1000);
      let currentTimeString = currentDate.toISOString().substring(11, 19);
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
    return await interaction.reply({ embeds : [response]});
  }
}
