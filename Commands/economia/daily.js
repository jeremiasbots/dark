const Discord = require('discord.js');
const User = require('../../Modelos/userEconomia.js')

module.exports = {
  name: "daily",
  alias: ["pagodiario"],
  developer: true,
  premium: true,
  cooldown: 86400,

  async execute(client, message, args) {

    const user = await User.findOne({ guildId: message.guild.id, userId: message.author.id })


     if(!user){
       const data = new User({
         guildId: message.guild.id,
         userId: message.author.id,
         money: 5000,
         moneyBank: 0
       })
       await data.save()
       return message.reply({ content: "Has ganado `5000$` espera un día para ganar de nuevo", allowedMentions: { repliedUser: false } })
     } else {
       user.money = Math.floor(user.money + 5000)
       await user.save(); // ya se me fueron las ideas 🎃
       return message.reply({ content: "Has ganado `5000$` espera un día para ganar de nuevo", allowedMentions: { repliedUser: false }})
     }
  }

}