const { loopPlayer } = require('../interactions/loopPlayer.js');
const { ButtonStyle , ButtonBuilder, ActionRowBuilder} = require('discord.js');

module.exports = {
  id : "loopButton",
  execute(interaction){
    const player = loopPlayer(interaction);
    if(!player) return;
    // do something here to update the button later
    
  }
}
