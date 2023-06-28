

module.exports = {
  vulkava : true,
  name : "trackStuck",
  execute(client, player, track, thresholdMs){
    const channel = client.channels.cache.get(player.textChannelId);

    channel.send(`Track got stuck : ${track.title} after ${thresholdMs}, skipping`);
    player.skip(); 
  }
}
