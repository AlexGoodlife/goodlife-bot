const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data : new SlashCommandBuilder().setName('ping').setDescription('pings'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },

};
