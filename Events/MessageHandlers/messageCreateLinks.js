const { Client, Message } = require("discord.js")
const find = require("../../Modelos/setupAntiLinks.js")

module.exports = {
    name: "messageCreate",
    /**
     * @param {Client} client
     * @param {Message} message
     */

    async execute(message, client, Discord){

  const data = await find.findOne({ Guild: message.guildId })

  if(!data || data.isActive == false) return;

  if(message.content.includes("discord.gg") || message.content.includes("http://") || message.content.includes("https://") || message.content.includes("www") || message.content.includes("paypal.com")){
   message.channel.send(`<@${message.author.id}> No se pueden mandar links en el servidor`).then(msg => {
     setTimeout(() => {
       msg.delete()
     }, 8000)
   })
   await message.delete()
  }
    }
}