
module.exports = {
  vulkava : true,
  name : "trackStart",
  execute(client, player, track){
    const channel = client.channels.cache.get(player.textChannelId);

    channel.send(`Now playing \`${track.title}\``);
  }
}
