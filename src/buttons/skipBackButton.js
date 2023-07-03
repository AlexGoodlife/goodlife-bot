const { skipBackPlayer } = require('../interactions/skipBackPlayer');

module.exports = {
  id : "skipBackButton",
  async  execute(interaction){
    await skipBackPlayer(interaction, 1);
  }
}
