const { Client, Message, MessageEmbed } = require('discord.js')
const Blacklist = require('../../Modelos/Blacklist')

module.exports = {
  name: "blacklist",
  alias: ["listanegra"],
  developer: true,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {string[]} args
   */

  async execute(client, message, args) {

      const id = args[0]
      const prueba = args[1]
      const razon = args.slice(2).join(" ")
      if(!id && !prueba && !razon){
        return message.reply({ content: "El comando se usa asi $blacklist <id> <prueba> <razon> ", allowedMentions: { repliedUser: true }}) // escribe algo aca p, yo no hare todo el codigo xD //Que vago xDDDDD
      } else {
        const exist = await Blacklist.findOne({
          userId: id
        })
        if(exist){
          return message.reply({ content: "Este usuario ya esta blacklisteado jajdkafnkfnkfn fkasfasn fnfsdbjjbklsf", allowedMentions: { repliedUser: true } })
        }

        client.users.fetch(id).then(async u => {
          const blacklist = new Blacklist({
            userId: id,
            pruebas: prueba,
            razon: razon
          })
          await blacklist.save()
          message.reply({ content: `**\`${u.username}\`** ha sido bloqueado del bot`, allowedMentions: { repliedUser: false }})
        })
      }//ya se xd //prro xd //y el desbanear XDDDDDD



  }

} 