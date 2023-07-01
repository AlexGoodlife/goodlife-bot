const { SlashCommandBuilder } = require('discord.js');
const { skipBackPlayer } = require('../../interactions/skipBackPlayer');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('skipback')
  .setDescription('Goes back one song'),
  async execute(interaction) {
    skipBackPlayer(interaction);
  },

};
