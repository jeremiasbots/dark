const { Client, Message, MessageEmbed } = require('discord.js')
const dev = require('./../../Modelos/usersDev')

module.exports = {
  name: "adduser",
  alias: ["addev", "adduserdev", "adduserdeveloper", "adddev"],
  premium: false,
  developer: false,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {string[]} args
   */

  async execute(client, message, args) {

    if(message.author.id !== client.owner){
      message.reply("Este comando es solo para el owner del bot.")
      return;
    }

      const id = args[0]
      if(!id){
        return message.reply({ content: "El comando se usa asi $adduser <id> ", allowedMentions: { repliedUser: true }}) // escribe algo aca p, yo no hare todo el codigo xD //Que vago xDDDDD
      } else {
        const exist = await dev.findOne({
          userId: id
        })
        if(exist){
          return message.reply({ content: "Este usuario ya esta añadido al bot jajaie4eiñfd", allowedMentions: { repliedUser: true } })
        }

        client.users.fetch(id).then(async u => {
          const blacklist = new dev({
            userId: id
          })
          await blacklist.save()
          message.reply({ content: `**\`${u.username}\`** ha sido añadido como developer del bot`, allowedMentions: { repliedUser: false }})
        })
      }//ya se xd //prro xd //y el desbanear XDDDDDD



  }

} 