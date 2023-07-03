const { SlashCommandBuilder, EmbedBuilder, bold} = require('discord.js');
const  { embedColor } = require('../../../config.json');
const timeFormat = require('../../util/time-format.js');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('queue-loop')
  .setDescription('Loops current queue'),

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
    let responseString = 'on';
    if(player.queueRepeat){
      responseString = 'off';
    }

    player.setQueueLoop(!player.queueRepeat);
    response.setDescription(`Queue Looping was turned ${bold(responseString)} by ${interaction.member.toString()}`)
    if(player.queueRepeat){
      const currentTimeString = timeFormat(player.queue.duration);
      response.setFields(
        {
          name: 'Number of tracks',
          value: `${player.queue.size}`
        },
        {
          name: 'Length',
          value: currentTimeString 
        }
      );
      response.setThumbnail(player.current.thumbnail);
    }
    return await interaction.reply({embeds: [response]});
  },

};
