const { ActionRowBuilder, ButtonBuilder, AttachmentBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
  vulkava : true,
  name : "trackStart",
  execute(client, player, track){
    const channel = client.channels.cache.get(player.textChannelId);

    const thumbnailUrl = client.guilds.cache.get(player.guildId).iconURL();
    const embed = new EmbedBuilder()
    .setAuthor({name : 'Now playing!', iconURL: thumbnailUrl})
    .setTitle(`${track.title}`)
    .setColor(embedColor)

    // const playEmoji = client.emojis.cache.find( e => e.name === "play_pause");
    const buttons  = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId('pauseButton')
        .setLabel('Pause')
        .setStyle(ButtonStyle.Primary),
        // .setEmoji(playEmoji.toString()),
      new ButtonBuilder()
        .setCustomId('skipButton')
        .setLabel('Skip')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('stopButton')
        .setLabel('Stop')
        .setStyle(ButtonStyle.Primary)
     );

    channel.send({embeds : [embed], components : [buttons]});

    // channel.send(`Now playing \`${track.title}\``);
  }
}
