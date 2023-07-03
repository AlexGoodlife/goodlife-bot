const { pausePlayer } = require('../interactions/pausePlayer');
const buildButtons = require('../util/dash-buttons.js');

module.exports = {
  id : "pauseButton",
  async execute(interaction){
    const response = await pausePlayer(interaction);
    if(!response.sucess) return;

    const player = interaction.client.vulkava.players.get(interaction.guild.id);
    if(!player)return;
    await interaction.update({components: [buildButtons(player)]});
    await interaction.followUp({embeds: [response.embed]});
  }
}
