module.exports = {
  vulkava : true,
  name : "playerDisconnect",
  async execute(client, player, code, reason){
    // Don't really know what to do here, as for handling player moving goes
    console.log("Socket closed");
    console.log(reason);
    console.log(player.voiceChannelId);
    if(player.createdVoiceChannelId === player.voiceChannelId){ // player was disconnected
      if(client.lastTrack){
        try{
          await client.lastTrack.delete();
          client.lastTrack = null;
        }
        catch(err){
          console.error(err);
        }
      }
      player.destroy();
      console.log("player was disconnected");
    }
    else{
      player.createdVoiceChannelId = player.voiceChannelId;
    }
  }
}
