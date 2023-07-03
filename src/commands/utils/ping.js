const { SlashCommandBuilder, EmbedBuilder , bold} = require('discord.js');
const { embedColor }  = require('../../../config.json');

module.exports = {
  data : new SlashCommandBuilder().setName('ping').setDescription('pings'),
  async execute(interaction) {
    const response = new EmbedBuilder().setDescription(bold('Pong!'));
    response.setColor(embedColor)
    await interaction.reply({embeds: [response]});
  },

};
