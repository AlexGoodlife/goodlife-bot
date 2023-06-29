const { Events } = require('discord.js');

const handleCommands = async (interaction) => {
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
};

const handleButtons = async (interaction) => {
  const button = interaction.client.buttons.get(interaction.customId);
  if(!button){
    console.error(`No button found for ${interaction.customId}`);
  }

  try{
    await button.execute(interaction);
  }catch(err){
      if(interaction.replied || interaction.deferred){
        await interaction.followUp({content : 'Error executing button'});
      }
      else{
        await interaction.reply({content : 'Error executing button'});
      }
  }
};

module.exports = {
  name : Events.InteractionCreate,
  async execute(interaction) {
    if(interaction.isChatInputCommand()){
      handleCommands(interaction);
    }
    else if(interaction.isButton()){
      handleButtons(interaction);
    }
  },
};
