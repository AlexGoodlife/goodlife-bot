const { skipPlayer } = require('../interactions/skipPlayer');

module.exports = {
  id : "skipButton",
  execute(interaction){
    skipPlayer(interaction);
  }
}
