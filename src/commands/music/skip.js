
const { SlashCommandBuilder } = require('discord.js');
const { skipPlayer } = require('../../interactions/skipPlayer');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('skip')
  .setDescription('skips current song'),
  async execute(interaction) {
    skipPlayer(interaction);
  },

};
