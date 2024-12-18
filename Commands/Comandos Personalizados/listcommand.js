const Discord = require('discord.js');
const schema = require('./../../Modelos/custom-commands')


module.exports = {
  name: "commands-list", 
  alias: ["list-custom-commands"], 

async execute (client, message, args){

    const data  = await schema.find({ Guild: message.guild.id });
    if(!data) return message.channel.send('No hay custom commands en este servidor.');

    const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${data.map((cmd, i) => `${i + 1}: ${cmd.Command}`).join('\n')}`)

    message.channel.send({ embeds: [embed] })


 }

} 