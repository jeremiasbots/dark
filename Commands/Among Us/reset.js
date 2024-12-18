const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')


module.exports = {
  name: "reset", 
  alias: [], 

async execute (client, message, args){

  


  const role = message.guild.roles.cache.find((r) => r.name === 'El mod de amogus')
        //--------------------------------------------------------------------------------------------------------
        if (!role) return message.channel.send(`Among Us no ha sido seteado, para setearlo \n,setup\n asi lo seteara.`)
        if (!message.member.roles.cache.has(role.id)) return message.channel.send(`Este comando solo puede ser usado por los miembros del rol ${role}, role.`)
        let channel = message.member.voice.channel;
        for (let member of channel.members.filter((member) => !member.user.bot)) {
            await member[1].voice.setDeaf(false).then(member[1].voice.setMute(false));
        }
        message.channel.send('Reset Completo')


 }

} 