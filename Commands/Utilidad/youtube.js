const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 })
const { WebhookClient } = require('discord.js')


module.exports = {
  name: "ytbot",
  alias: [],
  developer: true,
  premium: false,
  cooldown: 0,

  async execute(client, message, args) {
    //https://discord.com/api/webhooks/955187700762292226/NZnfSwdK78_hOxY-ExUunghmIERwxU8Ilmp7Wy-_uQTDbW6OeFsdwFst58Q4r7PS_42J
    const wc = new WebhookClient({
      id: "955187700762292226",
      token: "NZnfSwdK78_hOxY-ExUunghmIERwxU8Ilmp7Wy-_uQTDbW6OeFsdwFst58Q4r7PS_42J"
    })

    const losdevssonlibresxddd = args.join(" ")

    wc.send({
      avatarURL: "https://media.discordapp.net/attachments/953365893147144342/955188427630972989/imagencanal.jpg",
      content: "<@&965292654260801537> Aprende a Configurar Discord ha subido un nuevo video ve a verlo:\n\n" + losdevssonlibresxddd
    }) // si si, pusiste que envie el argumento XD :V // REGISTRASTE EL SLASH NO? SI XD

    message.delete()

  }

} 