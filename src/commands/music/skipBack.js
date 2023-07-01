const { SlashCommandBuilder } = require('discord.js');
const { skipBackPlayer } = require('../../interactions/skipBackPlayer');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('skipback')
  .setDescription('Goes back one song')
  .addNumberOption(option =>
    option.setRequired(false)
    .setName('amount')
    .setDescription("Number of tracks to reverse")
    .setMinValue(1),
  ),
  async execute(interaction) {
    const amount = interaction.options.getNumber('amount');
    skipBackPlayer(interaction, amount);
  },

};
