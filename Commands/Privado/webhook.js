const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 })
const { WebhookClient } = require('discord.js')


module.exports = {
  name: "gbot",
  alias: [],
  developer: true,
  premium: false,
  cooldown: 0,

  async execute(client, message, args) {
    const wc = new WebhookClient({
      id: "953812530499833917",
      token: "E-Z_Gnf85lmaMCWU3XmKXe-R6oD4-LYE03yZPeq8qBQuzf2nT8SYVFBam_-Muez3O0JB"
    })

    const losdevssonlibresxddd = args.join(" ")

    wc.send({
      avatarURL: client.users.cache.get("682775951515320366").displayAvatarURL({ dynamic: true }),
      content: losdevssonlibresxddd
    }) // si si, pusiste que envie el argumento XD :V // REGISTRASTE EL SLASH NO? SI XD

    message.delete()

    //NO FUNCIONA XD HAY ALGO MAL EN LA CONST WC || dejame preguntarle a las docs y pa mi modo es mejor usar object




  }

} 