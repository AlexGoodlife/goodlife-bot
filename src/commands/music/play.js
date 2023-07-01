const { SlashCommandBuilder, EmbedBuilder, bold, PermissionsBitField} = require('discord.js');
const { embedColor } = require('../../../config.json');
const CustomQueue = require('../../util/CustomQueue.js');
const formatTime = require('../../util/time-format.js');

module.exports = {
  data : new SlashCommandBuilder()
  .setName('play')
  .setDescription('plays queried music')
  .addStringOption( option =>
    option.setName('track')
    .setDescription('Song to play')
    .setRequired(true)
  ),
  async execute(interaction) {
    const client = interaction.client;
    const track = interaction.options.getString('track');
    let response = new EmbedBuilder().setColor(embedColor);

    if(!interaction.member.voice.channel) {
      response.setDescription(`You need to join a voice channel first`);
      return await interaction.reply({embeds : [response], ephemeral: true});
    }

    const botPermissions = await interaction.guild.members.me?.permissionsIn(interaction.member.voice.channel).has(PermissionsBitField.Flags.ViewChannel);
    const botPermissions2 = await interaction.guild.members.me?.permissionsIn(interaction.member.voice.channel).has(PermissionsBitField.Flags.Speak);
    if(!botPermissions || !botPermissions2){
      response.setDescription('I need to be able to see your voice channel and speak in it');
      return await interaction.reply({embeds : [response], ephemeral: true});
    }
    const res = await client.vulkava.search(track);

    if (res.loadType === "LOAD_FAILED") {
      response.setDescription(`:x: Load failed. Error: ${res.exception.message}`);
      return await interaction.reply({embeds : [response], ephemeral: true});
    } else if (res.loadType === "NO_MATCHES") {
      response.setDescription(':x: No matches!');
      return await interaction.reply({embeds : [response], ephemeral: true});
    }

      // Creates the audio player
    const  player = client.vulkava.createPlayer({
        guildId: interaction.guild.id,
        voiceChannelId: interaction.member.voice.channelId,
        textChannelId: interaction.channel.id,
        selfDeaf: true,
        queue : new CustomQueue()
      });

    if(player.state != "CONNECTED"){
      try{
        player.connect(); // Connects to the voice channel
      }
      catch(err){
        console.error(err);
        player.destroy();
      }
    }

    if(player.voiceChannelId != interaction.member.voice.channelId) {
      response.setDescription(`You are not in the same voice channel as me`);
      return await interaction.reply({embeds : [response], ephemeral: true});
    }

    if (res.loadType === 'PLAYLIST_LOADED') {
      for (const track of res.tracks) {
        track.setRequester(interaction.user);
        await player.queue.add(track);
      }

      const iconUrl = interaction.member.user.avatarURL();
      let currentTimeString = formatTime(res.playlistInfo.duration);
      response
        .setAuthor({name: 'Enqueued a playlist', iconURL : iconUrl})
        .setDescription(`${bold(res.playlistInfo.name)}`)
        .setFields([
          {
            name: "Length",
            value: currentTimeString
          }
        ]);
    } else {
      const track = res.tracks[0];
      track.setRequester(interaction.user);
      let currentTimeString = formatTime(track.duration);

      await player.queue.add(track);
      const place = bold(` #${player.queue.size}`);
      const iconUrl = interaction.member.user.avatarURL();
      response
        .setAuthor({name: 'Enqueued', iconURL : iconUrl})
        .setDescription(`\[${track.title}](${track.uri}) at ${place}`)
        .setURL(track.uri)
        .setFields([
          {
            name: 'Author',
            value: track.author,
            inline: true
          },
          {
            name: "Length",
            value: currentTimeString,
            inline: true
          }
      ]);
    }

    if (!player.playing){ await player.play();}

    await interaction.reply({embeds :[response]});

  },

};
