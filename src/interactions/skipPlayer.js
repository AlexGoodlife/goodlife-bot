const { EmbedBuilder , bold} = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
  async skipPlayer(interaction, amount){
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

    const oldQueueSize = player.queue.size;
    await player.skip(amount);
    const title = player.current.title;
    const iconUrl = interaction.member.user.avatarURL();
    let descriptionString = bold(title);
    if(amount > 1){
      const amountString = `${Math.min(amount-1, oldQueueSize)}`;
      descriptionString += ` and ${bold(amountString)} other tracks`;
    }
    response.setDescription(descriptionString);
    response.setAuthor({name : 'Skipped', iconURL : iconUrl});
    return await interaction.reply({ embeds : [response]});
  }
}
