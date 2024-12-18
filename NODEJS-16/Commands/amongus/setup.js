const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')


module.exports = {
  name: "setup", 
  alias: [], 

async execute (client, message, args){

  
  const userblack = message.author;

  const embed = new Discord.MessageEmbed()
  .setTitle('Among Us Setup Completado')
  .setColor('GREEN')

  if(blacklist.has(`${userblack.id}`)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

   const role = message.guild.roles.cache.find((r) => r.name === 'amongus-moderator')


        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Necesitas manejar mensajes para usar este comando')
        if(!message.guild.me.permissions.has('ADMINISTRATOR')) return message.channel.send('Necesitas Administrador para continuar')
        if(!role) {
        let auRole = await message.guild.roles.create({
            data: {
              name: 'El mod de amogus'
            }
          })
          message.channel.send({ embeds: [embed] })
        } else {
            message.channel.send('` Among-Us Role ` ha sido creado!')
        }


 }

} 