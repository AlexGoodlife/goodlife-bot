const { stopPlayer } = require('../interactions/stopPlayer');

module.exports = {
  id : "stopButton",
  execute(interaction){
    stopPlayer(interaction);
  }
}
