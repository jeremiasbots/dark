const Discord = require('discord.js');
const schema = require('./../../Modelos/custom-commands')


module.exports = {
  name: "command-delete", 
  alias: ["delete-custom-command"], 

async execute (client, message, args){


    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('No tienes los permisos para usar este comando.');

        const name = args[0];

        if(!name) return message.channel.send('Especifica el nombre del comando que quieres borrar.');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send('El comando que quieres borrar no existe.');
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`Se ha removido el comando: **${name}**`);


 }

} 