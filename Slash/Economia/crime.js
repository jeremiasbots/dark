const Discord = require('discord.js');
const economy = require("../../Modelos/userEconomia.js")

module.exports = {
  name: "crime", 
  description: "Comete un crimen",
  type: 1,
  cooldown: 10,

async aplication(interaction, client){

  const user = interaction.user
  
  const data = await economy.findOne({ guildId: interaction.guild.id, userId: interaction.user.id })

  if(!data){
    await economy.create({
      guildId: interaction.guild.id,
      userId: interaction.user.id,
      money: 0,
      moneyBank: 0,
      items: []
    })
  }

  const poll = ['has robado el banco de españa', 'has hackeado al gobierno']

  const pollmalo = ['has robado el banco de españa pero la polícia te capturo a ti y a tu banda', 'has intentado hackear al gobierno pero te enviaron a la carcel']

  let resultadosbuenos = poll[Math.floor(Math.random() * poll.length)]

  let resultadosmalos = pollmalo[Math.floor(Math.random() * pollmalo.length)]

  let resultados = [resultadosbuenos, resultadosmalos]

  let resultadofinal = resultados[Math.floor(Math.random() * resultados.length)]

  let dinero = Math.floor(Math.random() * 175) + 100

  

  

  if(resultadofinal === resultadosbuenos){

  data.money = Math.floor(data.money + dinero)
  await data.save();

  const embed = new Discord.MessageEmbed()
  .setTitle("Crime")
  .setDescription(`**${user.tag}** **${resultadosbuenos}** y has conseguido **${dinero}**`)
  .setColor("GREEN")

  interaction.reply({ embeds: [embed] })

  }

  if(resultadofinal === resultadosmalos){

  data.money = Math.floor(data.money - dinero)
  await data.save();

  const embed = new Discord.MessageEmbed()
  .setTitle("Crime")
  .setDescription(`**${user.tag}** **${resultadosmalos}** y has perdido **${dinero}**`)
  .setColor("RED")

  interaction.reply({ embeds: [embed] })

  }
  
 }



}
  