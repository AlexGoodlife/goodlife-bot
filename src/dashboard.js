const { ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');


module.exports = {
  getDashBoard(player){
    if(!player) return null;

    const result = {
      content:'HelloWorld'
    }
    return result;
  }
}
