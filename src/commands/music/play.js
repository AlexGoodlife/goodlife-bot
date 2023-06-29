const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../../config.json');

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
      return await interaction.reply({embeds : [response]});
    }
    const res = await client.vulkava.search(track);

    if (res.loadType === "LOAD_FAILED") {
      response.setDescription(`:x: Load failed. Error: ${res.exception.message}`);
      return await interaction.reply({embeds : [response]});
    } else if (res.loadType === "NO_MATCHES") {
      response.setDescription(':x: No matches!');
      return await interaction.reply({embeds :[response]});
    }

      // Creates the audio player
    const  player = client.vulkava.createPlayer({
        guildId: interaction.guild.id,
        voiceChannelId: interaction.member.voice.channelId,
        textChannelId: interaction.channel.id,
        selfDeaf: true
      });

    if(player.state != "CONNECTED"){
      player.connect(); // Connects to the voice channel
    }

    if(player.voiceChannelId != interaction.member.voice.channelId) {
      response.setDescription(`You are not in the same voice channel as me`);
      return await interaction.reply({embeds :[response]});
    }

    if (res.loadType === 'PLAYLIST_LOADED') {
      for (const track of res.tracks) {
        track.setRequester(interaction.user);
        player.queue.add(track);
      }

      const iconUrl = interaction.member.user.avatarURL();
      response
        .setAuthor({name: 'Enqueued', iconURL : iconUrl})
        .setDescription(`Added playlist \`${res.playlistInfo.name}`);
    } else {
      const track = res.tracks[0];
      track.setRequester(interaction.user);

      player.queue.add(track);
      const iconUrl = interaction.member.user.avatarURL();
      response
        .setAuthor({name: 'Enqueued', iconURL : iconUrl})
        .setDescription(`Added track \`${track.title}`);
    }

    if (!player.playing) player.play();
    await interaction.reply({embeds :[response]});

  },

};
