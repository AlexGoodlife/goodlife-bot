const { SlashCommandBuilder, EmbedBuilder, bold} = require('discord.js');
const { loopPlayer }  = require('../../interactions/loopPlayer.js');
const  { embedColor } = require('../../../config.json');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('loop')
  .setDescription('Sets the current track to loop'),
  async execute(interaction) {
    await loopPlayer(interaction);
  },

};
