const { embedColor } = require('../../../config.json');
const { SlashCommandBuilder , EmbedBuilder} = require('discord.js');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('disconnect')
  .setDescription('disconnects bot'),
  async execute(interaction) {
    const client = interaction.client;
    let response = new EmbedBuilder().setColor(embedColor);

    if(!interaction.member.voice.channel){
      response.setDescription(`You need to join a voice channel first`);
      return interaction.reply({embeds: [response]});

    } 

    const player = client.vulkava.players.get(interaction.guild.id);
    if(!player){
      response.setDescription(`There is no player for this guild`);
      return interaction.reply({embeds: [response]});
    } 

    if(player.voiceChannelId != interaction.member.voice.channelId) {
      response.setDescription(`You are not in the same voice channel as me`);
      return interaction.reply({embeds: [response]});

    }
    player.destroy();
    response.setTitle('Bye bye');
    return interaction.reply({embeds: [response]});
  },

};
