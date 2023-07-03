const { skipPlayer } = require('../interactions/skipPlayer');

module.exports = {
  id : "skipButton",
  async execute(interaction){
    await skipPlayer(interaction,1);
  }
}
