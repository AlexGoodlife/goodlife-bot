const { EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
  async skipPlayer(interaction){
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

    player.skip();
    const title = player.current.title;
    const iconUrl = interaction.member.user.avatarURL();
    response.setDescription(`\ ${title}`);
    response.setAuthor({name : 'Skipped', iconURL : iconUrl});
    return await interaction.reply({ embeds : [response]});
  }
}
