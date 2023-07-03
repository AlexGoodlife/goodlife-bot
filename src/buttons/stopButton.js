const { stopPlayer } = require('../interactions/stopPlayer');

module.exports = {
  id : "stopButton",
  async execute(interaction){
    await stopPlayer(interaction);
  }
}
