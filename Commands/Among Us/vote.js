const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');



module.exports = {
  name: "vote", 
  alias: [], 

async execute (client, message, args){

  

  const embed = new Discord.MessageEmbed()

  .setTitle("Sesion de Votacion")
  .setTimestamp()
  .setDescription("Quien es el impostor?")
  .setColor("RANDOM")

   const role = message.guild.roles.cache.find((r) => r.name === 'El mod de amogus')
        //--------------------------------------------------------------------------------------------------------
        if (!role) return message.channel.send(`Among Us no ha sido seteado, por favor seteelo \n,setup\n para usar este comando!.`)
        if (!message.member.roles.cache.has(role.id)) return message.channel.send(`Este comando solo puede ser usado por los miembros del rol ${role}, role.`)
        let channel = message.member.voice.channel;
        for (let member of channel.members.filter((member) => !member.user.bot)) {
          await member[1].voice.setDeaf(false);
        }
        message.channel.send({ embeds: [embed] })


 }

} 