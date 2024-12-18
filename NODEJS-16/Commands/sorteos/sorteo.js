const Discord = require('discord.js');
const ms = require('ms')
const db = require("megadb")


module.exports = {
  name: "sorteo", 
  alias: ["sortear"], 

execute (client, message, args){

  var perms = message.member.permissions.has("ADMINISTRATOR")
  if(!perms) return message.channel.send("No tienes los permisos para crear un sorteo!")

  let channel = message.mentions.channels.first()
  if(!channel) return message.channel.send("Debes mencionar un canal!")

  let giveawayDuration = args[1]
  if(!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send("Debes decir una duracion valida")

  let giveawayWinners = args[2]
  if(isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send("Eso no es un numero valido de ganadores!")

  let giveawayPrice = args.slice(3).join(" ")
  if(!giveawayPrice) return message.channel.send("Debes decir que vas a sortear!")

  client.giveawaysManager.start(channel, {
    time: ms(giveawayDuration),
    prize: giveawayPrice,
    winnerCount: giveawayWinners,
    hostedBy: client.config.hostedBy ? message.author: null,

    messages: {
      giveaway: (client.config.everyoneMention ? "Hola\n\n" : "") + "**NUEVO SORTEO**",
      giveawayEnded: (client.config.everyoneMention ? "Hola\n\n" : "") + "**SORTEO FINALIZADO**",
      timeRemaining: `**TIEMPO RESTANTE**: **{duration}**`,
      inviteToParticipate: 'Reacciona en 🎉 para participar',
      winMessage: "En hora buena **{winners}** has ganado **{prize}**",
      embedFooter: "Acaba",
      noWinner: "Nadie participo en el sorteo",
      hostedBy: "Creado por **{user}**",
      winners: "ganadores",
      embedAt: 'acaba en',
      units: {
        seconds: 'segundos',
        minutes: 'minutos',
        hours: 'horas',
        days: 'dias',
        plural5: false
      }
    }
  })

  message.channel.send(`Sorteo empezado en **${channel}**`)


 }

} 