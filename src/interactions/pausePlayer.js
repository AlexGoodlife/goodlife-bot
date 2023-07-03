const { EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
  async pausePlayer(interaction){
    const client = interaction.client;
    let response = new EmbedBuilder().setColor(embedColor);

    if(!interaction.member.voice) {
      response.setDescription(`You need to join a voice channel first`);
      await interaction.reply({ embeds : [response], ephemeral: true});
      return {sucess : false, embed: response};
    }

    const player = client.vulkava.players.get(interaction.guild.id);
    if(!player) {
      response.setDescription(`There is no player for this guild`);
      await interaction.reply({ embeds : [response], ephemeral: true});
      return {sucess : false, embed: response};
    } 

    if(player.voiceChannelId != interaction.member.voice.channelId) {
      response.setDescription(`You are not in the same voice channel as me`);
      await interaction.reply({ embeds : [response], ephemeral: true});
      return {sucess : false, embed: response};
    } 

    if(!player.current){
      response.setDescription(`Queue is empty`);
      await interaction.reply({ embeds : [response], ephemeral: true});
      return {sucess : false, embed: response};
    } 

    const isPaused = player.paused;
    player.pause(!isPaused);
    const title = player.current.title;
    const iconUrl = interaction.member.user.avatarURL();
    let pauseString = 'Paused'
    if(isPaused){
      pauseString = 'Unpaused' 
    }
    pauseString += ` "${title}"` // max titles for stuff is usually under 256 characters anyways
    response.setAuthor({name : pauseString, iconURL : iconUrl});
    return {sucess: true, embed : response};
    // return await interaction.reply({ embeds : [response]});
  }
}
