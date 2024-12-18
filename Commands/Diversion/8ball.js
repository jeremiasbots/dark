const Discord = require('discord.js');

module.exports = {
  name: "8ball", 
  alias: ["mentira"], 

execute (client, message, args){

  


  const pregunta = args.join(" ")
  if(!pregunta) return message.channel.send("Que quieres decirme nada :0")

  if(pregunta.startsWith("http")){
    message.reply("No puedes preguntar links")
    return;
  }

  let respuestas = ["Si.", "No", "Posiblemente", "Eso es imposible","Pregunta otra cosa, eso es dificil","Pregunta más tarde, estoy teniendo un error","Probablemente si","Probablemente no"]
  let random = respuestas[Math.floor(Math.random() * respuestas.length)];

  const embed = new Discord.MessageEmbed()
  .setTitle("8ball")
  .setDescription(`A tu pregunta:\n**${pregunta}**\n\nMi respuesta es:\n**${random}**`)

  message.channel.send({ embeds: [embed] })

 }                                                 

} 