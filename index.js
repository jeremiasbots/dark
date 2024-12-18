const Discord = require('discord.js')
const client = new Discord.Client({ restTimeOffset: 0, partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'], intents: 3276543 })
const { DiscordTogether } = require("discord-together")
const { readdirSync } = require("fs")
const mongoose = require('mongoose')
const Premium = require('./Modelos/UserPremium')
require('colors')
const modal = require("discord-modals")
modal(client)
client.login(process.env.TOKEN)


require("./votes.js")

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("🎃 | Conectamos con exito a MongoDB")
}).catch((error) => {
  console.log(error)
})

const config = require('./config')
client.config = config
client.color = config.color;
client.discordTogether = new DiscordTogether(client)
client.owner = config.ownerID
client.la = {};
let idiomas = readdirSync('./Idiomas').filter(archivo => archivo.endsWith(".json")).map(idioma => idioma.replace(/.json/, ""))
for(const las of idiomas){
  const idiomas = ["en-US", "es-ES"]
  if(!idiomas.includes(las)){
    client.la[las] = require(`./Idiomas/en-US`)
    return;
  }
    client.la[las] = require(`./Idiomas/${las}`)
}
Object.freeze(client.la)



client.commands = new Discord.Collection();
client.slashcommands = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.subcommands = new Discord.Collection();

['commandHandler', 'eventHandler', 'slashHandler', 'distube'].forEach(handler => {
  require(`./Handlers/${handler}`)(client, Discord);
});



client.on("messageCreate", async (message) => {

  const user = await Premium.findOne({ userId: message.author.id });
  if (!user) {
    return;
  } else {
    if(!user.timestamp){
      return;
    }
    if ((user.timestamp + user.ctimestamp) < Date.now()){
      await Premium.findOneAndDelete({ userId: message.author.id });
      return message.channel.send({ content: `${message.author} vaya! Parece que tu premium ha expirado` });
    }
    
      }

})
//HANDLER



process.on('unhandledRejection', error => {
  console.error(error);
});

client.on('shardError', error => {
  console.error(error);
});



client.on('modalSubmit', async(modal) => {
  let responsecaptcha = modal.getTextInputValue("capt")
  let commandevalmodal = modal.getTextInputValue("code")

  

  if(modal.customId === "modalguild"){
  if(responsecaptcha == "darkbot" || responsecaptcha == "Darkbot"){
    if(modal.member.roles.cache.has("938971502232080514")){
      modal.member.send("No puedes verificarte ya tienes el rol")
      modal.deferReply({ ephemeral: true }).then(() => {
        modal.followUp({ content: "Ya tienes el rol, no puedes verificarte"})
      })
      return;
    }
     modal.member.roles.add("938971502232080514")
     modal.member.roles.remove("949837816244887572")
     modal.member.send("Has sido verificado en **Personas Finas** 😎")
     modal.deferReply({ ephemeral: true }).then(() => {
       modal.followUp({ content: "Has sido verificado" })
     })
  } else {
    modal.member.send("El captcha que has introducido en **Personas Finas** 😎 no es el correcto")
    modal.deferReply({ ephemeral: true }).then(() => {
      modal.followUp({ content: "El captcha no es el correcto" })
    })
  }
}

  if(modal.customId === "modaleval"){
        try {
            const evaluacionje = eval(commandevalmodal)

           modal.deferReply({ ephemeral: true }).then(() => {
             modal.followUp({ content: `El codigo ha sido evaluado por el bot` })
           })
        } catch (e) {
            modal.deferReply({ ephemeral: true }).then(() => {
              modal.followUp({ content: `Un error ha ocurrido: \`\`\`${e}\`\`\`` })
            })
        }
    }

    if(modal.customId === "reports"){
        const bug = modal.getTextInputValue("bug")

        const canal = await client.channels.cache.get("960614245882540152")
        canal.send({ content: `Se ha reportado un nuevo bug por: \`${modal.user.tag} | ID: ${modal.user.id}\`\n**BUG:** \`\`\`${bug}\`\`\``})
        modal.deferReply({ ephemeral: true }).then(() => {
          modal.followUp({ content: "El reporte se ha enviado correctamente" })
        })
    }
})

client.on("guildCreate", async(guild) => {
  if(guild.id === "1001598957417402500") guild.leave();
}) 


client.on('messageCreate', async (message) => {
  const Discord = require('discord.js');
  const deleteSchema = require(`./Modelos/auto-delete`);

  let cl = await deleteSchema.findOne({ GuildId: message.guild.id }).catch(() => { })
  if(!cl) return;

  if(message.channel.id == `${cl.ChannelId}`) {
    setTimeout(() => {
    message.delete().catch(() => {})
    }, cl.Tiempo) 
    }
})



/*
client.on('messageCreate', async (message) => {

  const vida = require("./Modelos/vidaSchema.js")
  const economy = require("./Modelos/userEconomia.js")

  const usertime = message.author
  const vidatime = await vida.findOne({ Guild: message.guild.id, User: message.author.id })
  const data = await economy.findOne({ guildId: message.guild.id, userId: message.author.id })
  if(!vidatime){
    await vida.create({
      Guild: message.guild.id,
      User: message.author.id,
      Vida: 20
    })
  }

  if(!data){
    await economy.create({
      guildId: message.guild.id,
      userId: message.author.id,
      money: 0,
      moneyBank: 0,
      items: []
    })
  }

  setInterval(async() => {
    vidatime.Vida = Math.floor(vidatime.Vida - 15)
    await vidatime.save();

  }, 3600000)


  if (vidatime.Vida >= 100) {
    data.money = 30000
    await data.save();
    usertime.send("Se te ha añadido 30000$ por tener la vida en 100 en **" + message.guild + "**.")
    vidatime.Vida = 20
    await vidatime.save();
    return;
  }

})
*/

//Funciones

/*Funcion v12
async function createAPIMessage(interaction, content) {
  const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
    .resolveData()
    .resolveFiles();

  return { ...apiMessage.data, files: apiMessage.files }
}

Funcion v12
*/