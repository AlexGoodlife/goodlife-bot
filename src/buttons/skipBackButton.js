const { skipBackPlayer } = require('../interactions/skipBackPlayer');

module.exports = {
  id : "skipBackButton",
  execute(interaction){
    skipBackPlayer(interaction);
  }
}
