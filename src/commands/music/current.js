
const { SlashCommandBuilder, EmbedBuilder, bold} = require('discord.js');
const  { embedColor } = require('../../../config.json');

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

    let date = new Date(0);
    date.setSeconds(player.exactPosition/1000);
    let timeString = date.toISOString().substring(11, 19);
    let currentDate = new Date(0);
    currentDate.setSeconds(player.current.duration/ 1000);
    let currentTimeString = currentDate.toISOString().substring(11, 19);
    response.setTitle('Current track');
    response.setFields(
      {
        name: 'Title',
        value: player.current.title,
        inline: true
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
