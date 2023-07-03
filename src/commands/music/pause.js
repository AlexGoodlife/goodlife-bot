const { SlashCommandBuilder, EmbedBuilder, bold} = require('discord.js');
const { pausePlayer }  = require('../../interactions/pausePlayer.js');
const  { embedColor } = require('../../../config.json');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('pause')
  .setDescription('Pauses or unpauses the player'),
  async execute(interaction) {
    const response = await pausePlayer(interaction);
    if(!response.sucess) return;
    await interaction.reply({embeds: [response.embed]});
  },

};
