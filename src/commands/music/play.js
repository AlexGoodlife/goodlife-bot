const { SlashCommandBuilder } = require('discord.js');

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

    if(!interaction.member.voice) return interaction.reply(`You need to join a voice channel first`);


    const res = await client.vulkava.search(track);

    if (res.loadType === "LOAD_FAILED") {
      return interaction.reply(`:x: Load failed. Error: ${res.exception.message}`);
    } else if (res.loadType === "NO_MATCHES") {
      return interaction.reply(':x: No matches!');
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

    if(player.voiceChannelId != interaction.member.voice.channelId) 
      return interaction.reply(`You are not in the same voice channel as me`);

    if (res.loadType === 'PLAYLIST_LOADED') {
      for (const track of res.tracks) {
        track.setRequester(interaction.user);
        player.queue.add(track);
      }

      interaction.reply(`Playlist \`${res.playlistInfo.name}\` loaded!`);
    } else {
      const track = res.tracks[0];
      track.setRequester(interaction.user);

      player.queue.add(track);
      interaction.reply(`Queued \`${track.title}\``);
    }

    if (!player.playing) player.play();

  },

};
