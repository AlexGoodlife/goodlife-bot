
const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../../config.json');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('skip')
  .setDescription('skips current song'),
  async execute(interaction) {
    const client = interaction.client;
    let response = new EmbedBuilder().setColor(embedColor);

    if(!interaction.member.voice) {
      response.setDescription(`You need to join a voice channel first`);
      return interaction.reply({ embeds : [response]});
    }

    const player = client.vulkava.players.get(interaction.guild.id);
    if(!player) {
      response.setDescription(`There is no player for this guild`);
      return interaction.reply({ embeds : [response]});
    } 

    if(player.voiceChannelId != interaction.member.voice.channelId) {
      response.setDescription(`You are not in the same voice channel as me`);
      return interaction.reply({ embeds : [response]});
    } 

    if(!player.current){
      response.setDescription(`Queue is empty`);
      return interaction.reply({ embeds : [response]});
    } 

    player.skip();
    const title = player.current.title;
    const iconUrl = interaction.member.avatarURL();
    response.setDescription(`\ ${title}`);
    response.setAuthor({name : 'Skipped', iconURL : iconUrl});
    return interaction.reply({ embeds : [response]});
  },

};
