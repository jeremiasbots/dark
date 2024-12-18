const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const db = require('megadb')
const dinero = new db.crearDB("dinero")
const dinerobanco = new db.crearDB("dinerobanco")
const moment = require('moment')

module.exports = {
  data: new SlashCommandBuilder()
  .setName("userinfo")
  .setDescription("Ve la informacion de un usuario")
  .addUserOption(option => option.setName("usuario").setDescription("El usuario del que veras la informacion").setRequired(false)),

  async run(client, interaction){

    let estados = {
        "online": "Conectado",
        "offline": "Desconectado",
        "idle": "Ocupado",
        "dnd": "No molestar"
      }
    
      
    
      const member = interaction.options.getUser("usuario") || interaction.member;
    
      const Member = interaction.guild.members.cache.get(member.id)
    
    
      const Target = interaction.options.getUser("usuario") || interaction.member;
    
    
       const dinerototal = await dinero.obtener(`${member.id}`)
      const dinerobancototal = await dinerobanco.obtener(`${member.id}`)
      const dinerosutotal = dinerototal + dinerobancototal
    
      if(!dinero.tiene(interaction.guild.id)){
        const dinerosutotal = 0
      }
    
    
    
      const embed = new Discord.MessageEmbed()
      .setTitle(`Info del usuario`, `${member}`)
      .setColor("RANDOM")
      .addField(`Nombre completo`,`${member.names}`)
      .addField(`ID`,`${member.id}`)
      .addField(`Estado`,`${estados[member.presence.status]}`)
      .addField(`Nickname`, `${member}`)
      .addField("Union al server", `${moment(Member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}`)
      .addField("Cuando creo la cuenta", `${moment(Target.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`)
      .addField("**ROLES**", member.roles.cache.map(roles => `\`${roles.name}\``).join(', '))
      .addField("Boosts:", member.premiumSince ? 'Usuario booster': 'Usuario no booster')
      .addField("Dinero:", `${dinerosutotal}`)
      .setThumbnail(member.user.displayAvatarURL( {format: 'png', dynamic: 'true' }))
    
    
    
    
    
    
    
    interaction.reply({ embeds: [embed] })
    
  }
}