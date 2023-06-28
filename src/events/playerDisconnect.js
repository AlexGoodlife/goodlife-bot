module.exports = {
  vulkava : true,
  name : "playerDisconnect",
  execute(client, player, code, reason){
    // Don't really know what to do here, as for handling player moving goes
    console.log(reason);
    console.log(player.voiceChannelId);
  }
}
