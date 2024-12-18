const Discord = require('discord.js');
const economy = require("../../Modelos/userEconomia.js")

module.exports = {
  name: "slut", 
  alias: [], 
  developer: true,
  premium: false,
  cooldown: 10000,

async execute (client, message, args){

  const user = message.author;
  
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

  const poll = ['has hecho poll dance', 'has ido a un bar']

  const pollmalo = ['has hecho poll dance y te descubrio tu hija', 'has ido a un bar y te descubrio tu esposo']

  let resultadosbuenos = poll[Math.floor(Math.random() * poll.length)]

  let resultadosmalos = pollmalo[Math.floor(Math.random() * pollmalo.length)]

  let resultados = [resultadosbuenos, resultadosmalos]

  let resultadofinal = resultados[Math.floor(Math.random() * resultados.length)]

  let dinero = Math.floor(Math.random() * 175) + 100

  

  

  if(resultadofinal === resultadosbuenos){

  data.money = Math.floor(data.money + dinero)
  await data.save();

  const embed = new Discord.MessageEmbed()
  .setTitle("Slut")
  .setDescription(`**${user.tag}** **${resultadosbuenos}** y has conseguido **${dinero}**`)
  .setColor("GREEN")

  message.reply({ embeds: [embed] })

  }

  if(resultadofinal === resultadosmalos){

  data.money = Math.floor(data.money - dinero)
  await data.save();

  const embed = new Discord.MessageEmbed()
  .setTitle("Slut")
  .setDescription(`**${user.tag}** **${resultadosmalos}** y has perdido **${dinero}**`)
  .setColor("RED")

  message.reply({ embeds: [embed] })

  }
  
 }



}
  