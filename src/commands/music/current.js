
const { SlashCommandBuilder, EmbedBuilder, bold} = require('discord.js');
const  { embedColor } = require('../../../config.json');
const timeFormat = require('../../util/time-format.js');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('current')
  .setDescription('Shows current playing track'),
  async execute(interaction) {
    const client = interaction.client;
    let response = new EmbedBuilder().setColor(embedColor);
    const player = client.vulkava.players.get(interaction.guild.id);

    if(!player){
      response.setDescription(`There is no player for this guild`);
      return await interaction.reply({embeds: [response], ephemeral: true});
    } 

    let timeString = timeFormat(player.exactPosition);
    let currentTimeString = timeFormat(player.current.duration);
    response.setTitle('Current track');
    response.setFields(
      {
        name: 'Title',
        value: `[${player.current.title}](${player.current.uri})`,
        inline: true
      },
      {
        name: 'Author',
        value: player.current.author
      },
      {
        name: 'Requested by',
        value: player.current.requester.toString()
      },
      {
        name: 'Length',
        value: currentTimeString
      },
      {
        name: 'Position',
        value: timeString
      }

    );
    response.setThumbnail(player.current.thumbnail);
    return await interaction.reply({embeds: [response]});
  },

};
