
module.exports = {
  vulkava : true,
  name : "trackException",
  execute(client, player, track, error){
    const channel = client.channels.cache.get(player.textChannelId);

    channel.send(`TRACK EXCEPTION ON : ${track.title}\n ${error} `);
    // player.skip(); 
  }
}
