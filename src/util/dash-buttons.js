const { ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');

module.exports = function buildButtons(player){
  const stopEmoji = "⏹️";
  const skipEmoji = "⏭️";
  const loopEmoji = "🔁";
  const skipBackEmoji = "⏪";
  let loopStyle = player.trackRepeat ? ButtonStyle.Danger : ButtonStyle.Secondary; 
  let pauseStyle = player.paused ? ButtonStyle.Primary : ButtonStyle.Secondary;
  let playEmoji = player.paused ? "▶️" :"⏸️"; 
  const buttons  = new ActionRowBuilder().setComponents(
    new ButtonBuilder()
      .setCustomId('pauseButton')
      .setStyle(pauseStyle)
      .setEmoji(playEmoji),
    new ButtonBuilder()
      .setCustomId('skipBackButton')
      .setStyle(ButtonStyle.Success)
      .setEmoji(skipBackEmoji),
    new ButtonBuilder()
      .setCustomId('skipButton')
      .setEmoji(skipEmoji)
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('stopButton')
      .setStyle(ButtonStyle.Danger)
      .setEmoji(stopEmoji),
    new ButtonBuilder()
      .setCustomId('loopButton')
      .setStyle(loopStyle)
      .setEmoji(loopEmoji),
  );
  return buttons;

}
