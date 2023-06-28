const { Events } = require('discord.js');

module.exports = {
  name : Events.InteractionCreate,
  async execute(interaction) {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command){
      console.error(`No command found for ${interaction.commandName}`);
      return;
    }

    try{
      await command.execute(interaction);
    }
    catch(error){
      console.log(error);
      if(interaction.replied || interaction.deferred){
        await interaction.followUp({content : 'Error executing command'});
      }
      else{
        await interaction.reply({content : 'Error executing command'});
      }
    }
  },
};
