const { SlashCommandBuilder, EmbedBuilder, bold} = require('discord.js');
const  { embedColor } = require('../../../config.json');
const timeFormat = require('../../util/time-format');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('forward')
  .setDescription('forwards the current track')
  .addNumberOption(option =>
    option.setRequired(true)
    .setName("amount")
    .setDescription("Amount to set forward (in seconds)")
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
    const position = positionOffset + player.exactPosition;
    if(position >= player.current.duration){
      response.setDescription(`Sorry, the track isnt that long`);
      return await interaction.reply({embeds: [response], ephemeral : true});
    }
    if(!player.current.isSeekable){
      response.setDescription('Sorry I cant set this track forward');
      return await interaction.reply({embeds: [response], ephemeral : true});
    }
    player.seek(position);

    const timeString = timeFormat(position);
    response.setAuthor({name: 'Forwarded position in track', iconURL: interaction.member.user.avatarURL() });
    response.setDescription(`${bold(player.current.title)} set to ${bold(timeString)}`)
    return await interaction.reply({embeds: [response]});
  },

};
