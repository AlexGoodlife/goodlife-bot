
const { SlashCommandBuilder } = require('discord.js');
const { skipPlayer } = require('../../interactions/skipPlayer');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('skip')
  .setDescription('skips current song')
  .addNumberOption(option =>
    option.setRequired(false)
    .setName('amount')
    .setDescription("Number of tracks to skip")
    .setMinValue(1),
  ),
  async execute(interaction) {
    const amount = interaction.options.getNumber('amount');
    skipPlayer(interaction, amount);
  },

};
