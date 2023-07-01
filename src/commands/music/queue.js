const { SlashCommandBuilder, EmbedBuilder, bold} = require('discord.js');
const  { embedColor } = require('../../../config.json');
const timeFormat = require('../../util/time-format.js');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('queue')
  .setDescription('Shows current queue')
  .addNumberOption(option =>
    option.setRequired(false)
    .setName('page')
    .setDescription("Page of song list")
    .setMinValue(1),
  ),
  async execute(interaction) {
    const client = interaction.client;
    let response = new EmbedBuilder().setColor(embedColor);
    const player = client.vulkava.players.get(interaction.guild.id);

    if(!player){
      response.setDescription(`There is no player for this guild`);
      return await interaction.reply({embeds: [response], ephemeral: true});
    } 
    if(player.queue.size <= 0){
      response.setDescription(`There are no songs in the queue for this server`);
      return await interaction.reply({embeds: [response], ephemeral: true});
    }
    let page = interaction.options.getNumber('page');
    if(!page){
      page = 1;
    }

    const songsPerPage = Math.floor(25/3-1); // arbitrary number 
    console.log(songsPerPage);
    const numPages = Math.ceil(player.queue.size / (songsPerPage));
    page = Math.min(page, numPages);
    response.setTitle(`Queue for ${interaction.guild.name}`);
    response.setThumbnail(interaction.guild.iconURL());

    const fields = [];
    
    fields.push(
      {
        name: 'Title',
        value: ' ',
        inline: true
      },
      {
        name: 'Length',
        value: ' ',
        inline: true
      },
      {
        name: 'Requester',
        value: ' ',
        inline: true
      }
    );
    const multiplier = (page-1)*songsPerPage;
    const limit = Math.min(songsPerPage + (multiplier*songsPerPage), player.queue.size);
    for(let i = multiplier; i < limit;i++){
      const currentTrack = player.queue.getTrackAt(i);
      fields.push(
        {
          name: '\u200b',
          value: `[${currentTrack.title}](${currentTrack.uri})`,
          inline: true
        },
        {
          name: '\u200b',
          value: timeFormat(currentTrack.duration),
          inline: true
        },
        {
          name: '\u200b',
          value: currentTrack.requester.toString(),
          inline: true
        }
      );
    }
    response.setFields(fields);
    response.setFooter({text: `Page ${page} of ${numPages}`});

    return await interaction.reply({embeds: [response], ephemeral: true});
  },

};
