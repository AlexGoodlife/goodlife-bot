const { SlashCommandBuilder, EmbedBuilder, bold} = require('discord.js');
const  { embedColor } = require('../../../config.json');
const timeFormat = require('../../util/time-format');

// TODO, all seek based commands are very similiar, reduce this code repetition
module.exports = {
  data : new SlashCommandBuilder()
  .setName('rewind')
  .setDescription('rewinds the current track')
  .addNumberOption(option =>
    option.setRequired(true)
    .setName("amount")
    .setDescription("Amount to rewind (in seconds)")
  ),
  async execute(interaction) {
    const client = interaction.client;
    let response = new EmbedBuilder().setColor(embedColor);

    if(!interaction.member.voice.channel){
      response.setDescription(`You need to join a voice channel first`);
      return await interaction.reply({embeds: [response], ephemeral: true});

    } 
    const player = client.vulkava.players.get(interaction.guild.id);
    if(!player){
      response.setDescription(`There is no player for this guild`);
      return await interaction.reply({embeds: [response], ephemeral: true});
    } 

    if(player.voiceChannelId != interaction.member.voice.channelId) {
      response.setDescription(`You are not in the same voice channel as me`);
      return await interaction.reply({embeds: [response], ephemeral : true});

    }
    const positionOffset = interaction.options.getNumber('amount') * 1000; // convert to miliseconds
    const position =  player.exactPosition - positionOffset ;
    if(position < 0){
      response.setDescription(`Sorry, provided number goes beyond the track`);
      return await interaction.reply({embeds: [response], ephemeral : true});
    }
    if(!player.current.isSeekable){
      response.setDescription('Sorry I cant rewind this track');
      return await interaction.reply({embeds: [response], ephemeral : true});
    }
    player.seek(position);

    const timeString = timeFormat(position);
    response.setAuthor({name: 'Forwarded position in track', iconURL: interaction.member.user.avatarURL() });
    response.setDescription(`${bold(player.current.title)} set to ${bold(timeString)}`)
    return await interaction.reply({embeds: [response]});
  },

};
