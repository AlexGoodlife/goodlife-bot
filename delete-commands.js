const { REST, Routes } = require('discord.js');
const { token, guildID, clientID } = require('./config.json');

const rest = new REST().setToken(token);

let privateCommands = false;
const toDelete = [];
process.argv.slice(2,process.argv.length).forEach((value) =>{
  if(value == "-g"){
    privateCommands = true; 
  }
  else{
    toDelete.push(value);
  }
});

toDelete.forEach((value) =>{
  if(privateCommands){
    rest.delete(Routes.applicationGuildCommand(clientID, guildID,value))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);
  }
  else{
  rest.delete(Routes.applicationCommand(clientID, value))
    .then(() => console.log('Successfully deleted application command'))
    .catch(console.error);
  }
  console.log(value);
});

