
module.exports = {
  vulkava : true,
  name : "queueEnd",
  execute(client, player){
    const channel = client.channels.cache.get(player.textChannelId);

    channel.send(`Queue ended!`);

    player.destroy();
  }
}
