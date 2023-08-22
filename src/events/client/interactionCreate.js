const { Events, EmbedBuilder , PermissionsBitField} = require('discord.js');
const { embedColor } = require('../../../config.json');

const handleCommands = async (interaction) => {
  const command = interaction.client.commands.get(interaction.commandName);

  if(!command){
    console.error(`No command found for ${interaction.commandName}`);
    return;
  }
  const botPermissions = await interaction.guild.members.me?.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.SendMessages);
  const botPermissions2 = await interaction.guild.members.me?.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.EmbedLinks);
  const botPermissions3 = await interaction.guild.members.me?.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.ViewChannel);
  if(!botPermissions || !botPermissions2 || !botPermissions3){
    const response = new EmbedBuilder();
    console.log('Attempted to use bot in restricted channel');
    response.setDescription('This is a private text channel, give me permissions or I cant function');
    response.setColor(embedColor);
    try{

      await interaction.reply({embeds: [response], ephemeral: true});
    }
    catch(err){
      console.error(err);
    }
    return;
  }

  try{
    await command.execute(interaction);
  }
  catch(err){
    console.error(err);
  //   const thumbnailUrl = interaction.guild.iconURL();
  //   const response = new EmbedBuilder()
  //   .setAuthor({name: "There was an error!", iconURL: thumbnailUrl })
  //   .setDescription("An error occured when executing the command")
  //   .setColor(embedColor);
  //   if(interaction.replied || interaction.deferred){
  //     await interaction.followUp({embeds : [response], ephemeral: true});
  //   }
  //   else{
  //     await interaction.reply({embeds : [response], ephemeral: true});
  //   }
  // }
};

const handleButtons = async (interaction) => {
  const button = interaction.client.buttons.get(interaction.customId);
  if(!button){
    console.error(`No button found for ${interaction.customId}`);
  }

  try{
    await button.execute(interaction);
  }catch(err){
    console.error(err);
    // const thumbnailUrl = interaction.guild.iconURL();
    // const response = new EmbedBuilder()
    // .setAuthor({name: "There was an error!", iconURL: thumbnailUrl })
    // .setDescription("An error occured when executing the button")
    // .setColor(embedColor);
    // if(interaction.replied || interaction.deferred){
    //   await interaction.followUp({embeds : [response], ephemeral: true});
    // }
    // else{
    //   await interaction.reply({embeds : [response], ephemeral: true});
    // }
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
