const { pausePlayer } = require('../interactions/pausePlayer');

module.exports = {
  id : "pauseButton",
  execute(interaction){
    pausePlayer(interaction);
  }
}
