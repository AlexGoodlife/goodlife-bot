
module.exports = {
  vulkava : true,
  name : "trackException",
  execute(client, player, track, error){
    const channel = client.channels.cache.get(player.textChannelId);
    const embed = new EmbedBuilder().setDescription(`TRACK EXCEPTION ON :  \ ${track.title}\n ${error} `);
    embed.setColor(embedColor);
    channel.send({embeds : [embed]});
    // player.skip(); 
  }
}
