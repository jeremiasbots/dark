const Discord = require ('discord.js');
const Schema = require("../../Modelos/userEconomia.js")

module.exports = {
  name: "bal", 
  alias: ["money"], 

async execute (client, message, args){

  const userblack = message.author;
  


  const user = message.mentions.members.first() || message.member
  const member = message.mentions.members.first() || message.member
  const usuario = message.mentions.members.first() 
  const userbal = message.author;

  const data = await Schema.findOne({ guildId: message.guild.id, userId: message.author.id })

  if(!data){
    await data.create({ guildId: message.guild.id, userId: message.author.id, money: 0, moneyBank: 0, items: [] })
  }

  let items = data.items;

  if(!data.items || data.items === []){
     items = "No hay items en tu cuenta"
  }

 


  const usuarioem = message.mentions.members.first() || message.member


  const embed = new Discord.MessageEmbed()
  .setTitle(`Bal`)
  .setDescription(`Dinero: **${data.money}$** \n\nDinero en el banco: **${data.moneyBank}$**  \n\nTotal: **${Math.floor(data.money + data.moneyBank)}$**\n\n**OBJETOS:** ${items}`)
  .setColor("RED")
  .setTimestamp()
  .setFooter({ text: "Más actualizaciones proximamente" })
  .setThumbnail(usuarioem.user.displayAvatarURL({ dynamic: true, size: 1024 }))

  message.reply({ embeds: [embed] })

 }

} 