
const { EmbedBuilder , bold} = require('discord.js');
const { embedColor , waitAmount} = require('../../../config.json');
module.exports = {
  vulkava : true,
  name : "queueEnd",
  async execute(client, player){
    const channel = client.channels.cache.get(player.textChannelId);

    const thumbnailUrl = client.guilds.cache.get(player.guildId).iconURL();
    const embed = new EmbedBuilder()
    .setAuthor({name : 'Queue is done!', iconURL: thumbnailUrl})
    .setColor(embedColor)
    .setTimestamp();
    await channel.send({embeds : [embed]});

    if(client.lastTrack){
      try{
        await client.lastTrack.delete();
        client.lastTrack = null;

      }catch(err){
        console.error(err);
      }
    }
    
    client.waitTimeout = setTimeout(async () =>{
      try{
        const response = new EmbedBuilder()
        .setDescription(`[Leaving after waiting for ${bold(waitAmount)} minutes](https://github.com/AlexGoodlife)`)
        .setColor(embedColor)
        .setAuthor({name: 'Finished waiting', iconURL: thumbnailUrl})
        await channel.send({embeds: [response]});
        player.destroy();
      }
      catch(err){
        console.error(err);
      }
    }, waitAmount*60000);

  }
}
