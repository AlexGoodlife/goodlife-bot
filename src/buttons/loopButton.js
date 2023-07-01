const { loopPlayer } = require('../interactions/loopPlayer.js');

module.exports = {
  id : "loopButton",
  execute(interaction){
    loopPlayer(interaction);
  }
}
