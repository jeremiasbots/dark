const Discord = require('discord.js');
const User = require('../../Modelos/userEconomia.js')

module.exports = {
  name: "dep",
  alias: ["deposit"],
  developer: true,
  premium: false,
  cooldown: 5,

  async execute(client, message, args) {

    const user = await User.findOne({ guildId: message.guild.id, userId: message.author.id })

    if (!user) {
      return message.reply({ content: ":x: | **No te tengo registrado, por consiguiente deduzco que eres un puto pobre 😾**", allowedMentions: { repliedUser: false } })
    } else {
      if(!args){
        return message.reply({ content: ":x: | **Debes colocar una cantidad**", allowedMentions: { repliedUser: false } })
      }
      const papi = args[0]
      if(papi === "all"){
        if(user.money === 0){
          return message.reply({ content: ":x: | **Actualmente tienes solo `0$` de dinero**", allowedMentions: { repliedUser: false } })
        }
        user.moneyBank = user.moneyBank + user.money
        user.money = 0
        await user.save()
        return message.reply({ content: `✅ | **Se ha guardado todo tu dinero en el banco**`, allowedMentions: { repliedUser: false } })
      }
      if(isNaN(papi)){
        return message.reply({ content: ":x: | **Debes decir un numero valido**", allowedMentions: { repliedUser: false } })
      }
      const cantidad = parseInt(papi)
      if(user.money === 0){
        return message.reply({ content: ":x: | **Actualmente tienes solo `0$` de dinero**", allowedMentions: { repliedUser: false } })
      }
      if(user.money < cantidad){
        return message.reply({ content: `:x: | **No puedes depositar ${cantidad}$ porque solo tienes ${user.money}$**`})
      }
      user.moneyBank = Math.floor(user.moneyBank + cantidad)
      user.money = user.money - Math.floor(cantidad)
      await user.save()
      return message.reply({ content: `✅ | **Se ha guardado ${cantidad}$ en el banco**`, allowedMentions: { repliedUser: false } })
    }
  }

}