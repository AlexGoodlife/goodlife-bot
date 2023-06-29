const { EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
  async stopPlayer(interaction){
    const client = interaction.client;
    let response = new EmbedBuilder().setColor(embedColor);

    if(!interaction.member.voice.channel){
      response.setDescription(`You need to join a voice channel first`);
      return await interaction.reply({embeds: [response], ephemeral: true});

    } 
    const player = client.vulkava.players.get(interaction.guild.id);
    if(!player){
      response.setDescription(`There is no player for this guild`);
      return await interaction.reply({embeds: [response], ephemeral: true});
    } 

    if(player.voiceChannelId != interaction.member.voice.channelId) {
      response.setDescription(`You are not in the same voice channel as me`);
      return await interaction.reply({embeds: [response], ephemeral : true});

    }
    player.destroy();
    response.setTitle('Bye bye');
    response.setURL("https://github.com/AlexGoodlife")
    if(client.lastTrack){
      try {
        await client.lastTrack.delete();
        client.lastTrack = null;
        
      } catch (err) {
        console.error(err);        
      }
    }
    return await interaction.reply({embeds: [response]});
  }
}
