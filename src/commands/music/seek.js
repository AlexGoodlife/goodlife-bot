const { SlashCommandBuilder, EmbedBuilder, bold} = require('discord.js');
const timeFormat = require('../../util/time-format');
const  { embedColor } = require('../../../config.json');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('seek')
  .setDescription('Seeks timestamp in current song')
  .addNumberOption(option =>
    option.setRequired(true)
    .setName("timestamp")
    .setDescription("Timestamp to seek (in seconds)")
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
    const position = interaction.options.getNumber('timestamp') * 1000; // convert to miliseconds
    if(position >= player.current.duration || position < 0){
      response.setDescription(`Not a valid position to seek to`);
      return await interaction.reply({embeds: [response], ephemeral : true});
    }

    if(!player.current.isSeekable){
      response.setDescription('Sorry this track isnt seekable');
      return await interaction.reply({embeds: [response], ephemeral : true});
    }
    player.seek(position);

    const timeString = timeFormat(position);
    response.setAuthor({name: 'Seeked position in track', iconURL: interaction.member.user.avatarURL() });
    response.setDescription(`${bold(player.current.title)} set to ${bold(timeString)}`)
    response.setTimestamp();
    return await interaction.reply({embeds: [response]});
  },

};
