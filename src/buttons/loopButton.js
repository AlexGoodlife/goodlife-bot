const { loopPlayer } = require('../interactions/loopPlayer.js');
const buildButtons = require('../util/dash-buttons.js');

module.exports = {
  id : "loopButton",
  async execute(interaction){
    const response = await loopPlayer(interaction);
    if(!response.success) return;

    const player = interaction.client.vulkava.players.get(interaction.guild.id);
    if(!player)return;
    await interaction.update({components: [buildButtons(player)]});
    await interaction.followUp({embeds: [response.embed]});
    
  }
}
