

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('disconnect')
  .setDescription('disconnects bot'),
  async execute(interaction) {
    const client = interaction.client;

    if(!interaction.member.voice) return interaction.reply(`You need to join a voice channel first`);

    const player = client.vulkava.players.get(interaction.guild.id);
    if(!player)  return interaction.reply(`There is no player for this guild`);

    if(player.voiceChannelId != interaction.member.voice.channelId) 
      return interaction.reply(`You are not in the same voice channel as me`);
    player.destroy();
  },

};
