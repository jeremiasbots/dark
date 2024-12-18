const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');



module.exports = {
  name: "setup", 
  alias: [], 

async execute (client, message, args){

  


  const embed = new Discord.MessageEmbed()
  .setTitle('Among Us Setup Completado')
  .setColor('GREEN')

  

   const role = message.guild.roles.cache.find((r) => r.name === 'El mod de amogus')


        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Necesitas manejar mensajes para usar este comando')
        if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send('Necesitas MANAGE_ROLES para continuar')
        if(!role) {
        let auRole = await message.guild.roles.create({
              name: 'El mod de amogus'
          })
          message.channel.send({ embeds: [embed] })
        } else {
            message.channel.send('` Among-Us Role ` ha sido creado!')
        }


 }

} 