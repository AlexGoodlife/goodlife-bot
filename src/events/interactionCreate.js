const { Events, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.json');

const handleCommands = async (interaction) => {
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command){
      console.error(`No command found for ${interaction.commandName}`);
      return;
    }

    try{
      await command.execute(interaction);
    }
    catch(err){
      const thumbnailUrl = interaction.guild.iconURL();
      const response = new EmbedBuilder()
        .setAuthor({name: "There was an error!", iconURL: thumbnailUrl })
        .setDescription("An error occured when executing the command")
        .setColor(embedColor);
      console.error(err);
      if(interaction.replied || interaction.deferred){
        await interaction.followUp({embeds : [response], ephemeral: true});
      }
      else{
        await interaction.reply({embeds : [response], ephemeral: true});
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
    const thumbnailUrl = interaction.guild.iconURL();
    const response = new EmbedBuilder()
    .setAuthor({name: "There was an error!", iconURL: thumbnailUrl })
    .setDescription("An error occured when executing the button")
    .setColor(embedColor);
    console.error(err);
    if(interaction.replied || interaction.deferred){
      await interaction.followUp({embeds : [response], ephemeral: true});
    }
    else{
      await interaction.reply({embeds : [response], ephemeral: true});
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
