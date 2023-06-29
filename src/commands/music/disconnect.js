const { SlashCommandBuilder } = require('discord.js');
const { stopPlayer } = require('../../interactions/stopPlayer');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('disconnect')
  .setDescription('disconnects bot'),
  async execute(interaction) {
    stopPlayer(interaction);
  },

};
