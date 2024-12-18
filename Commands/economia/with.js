const Discord = require('discord.js');
const economy = require("../../Modelos/userEconomia.js")

module.exports = {
  name: "with", 
  alias: [], 
  developer: true,

async execute (client, message, args){ 

  const user = message.author

  const data = await economy.findOne({ guildId: message.guild.id, userId: message.author.id })
  
  if(!data){
    await economy.create({
      guildId: message.guild.id,
      userId: message.author.id,
      money: 0,
      moneyBank: 0,
      items: []
    })
  }

  const cantidad = args[0]
  if(!cantidad) return message.reply("Debes escribir una cantidad")

  if(cantidad === 'all'){
    data.money = Math.floor(data.money + data.moneyBank)
    data.moneyBank = 0
    await data.save();

    const embedall = new Discord.MessageEmbed()
    .setTitle("With all")
    .setDescription(`<@${user.id}> has convertido a efectivo todo tu dinero`)
    .setColor("RANDOM")

    message.reply({ embeds: [embedall] })
    return;
  }

  if(isNaN(cantidad)){
    return message.reply("Escribe un número!")
  }
  
  const dineroli = data.moneyBank

  if(cantidad > dineroli) return message.reply("No puedes convertir a efectivo esa cantidad por que es mayor a tu dinero en el banco")
  

  data.moneyBank = Math.floor(data.moneyBank - cantidad)
  data.money = Math.floor(data.money + cantidad)
  await data.save();


  const embed = new Discord.MessageEmbed()
  .setTitle("With")
  .setDescription(`<@${user.id}> has convertido a efectivo **${cantidad}**`)
  .setColor("RANDOM")
  
  message.reply({ embeds: [embed] })

  

  

 }

} 