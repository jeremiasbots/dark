const Discord = require('discord.js');
const schema = require('./../../Modelos/custom-commands')


module.exports = {
  name: "create-command", 
  alias: ["new-custom-command"], 

async execute (client, message, args){

    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Tu no puedes crear comandos.');

        const name = args[0]; const response = args.slice(1).join(" ");

        if(!name) return message.channel.send('Especifica un nombre para el comando.');
        if(!response) return message.channel.send('Especifica una respuesta.');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send('Este comando ya existe.');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`Nuevo comando creado, Nombre: **${name}**`);


 }

} 