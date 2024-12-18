const { Client, Message } = require('discord.js')
const db = require('megadb')
const qdb = new db.crearDB("afk") 
const Premium = require('../../Modelos/UserPremium')
const customschema = require('../../Modelos/custom-commands')
const prefixSchema = require('../../Modelos/prefixSchema')



module.exports = {
    name: "messageCreate",
    /**
     * @param {Client} client
     * @param {Message} message
     */

    async execute(message, client, Discord){
        let prefix;

  const data = await prefixSchema.findOne({ Guild: message.guild.id }).catch(() => { })

  if(data) {
    prefix = data.Prefix;
  } else {
    prefix = process.env.PREFIX
  }

  

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {

    const embed = new Discord.MessageEmbed()
    .setAuthor({ iconURL: message.author.displayAvatarURL(), name: "Menu de mención" })
    .setDescription(`**Hola, soy [👋] __${client.user.username}__ [👋] y soy un bot destinado a entretener tu servidor!**\n\nPrefijo predeterminado: \`$\`\nPrefijo del servidor: \`${prefix}\`\n\n**¿Te preguntas como puedes ver mis comandos?**\n- Es facil, solo debes colocar \`${prefix}help\` y podras acceder a mi panel de comandos!\n\n**Extra**\nPuedes resetear mi prefijo con ${prefix}reset-prefix`)
    .setFooter({ text: "Los developers son libres :D 😀"})
    .setColor("BLUE")
    .setTimestamp()

    message.reply({ embeds: [embed] })
  }


  
 

  if (message.author.bot || !message.guild) return;

  const usuarioafk = message.author;

  //afk///
  if (qdb.has(`afk-${message.author.id}+${message.guild.id}`)) {
    const tiempo = qdb.get(`afk-${message.author.id}+${message.guild.id}2`)
    await qdb.delete(`afk-${message.author.id}+${message.guild.id}`)
    message.channel.send(`Bienvenido al server ${usuarioafk}, tu estado afk ha sido removido\nAFK: <t:${tiempo}:R>`)
  }

  if (message.mentions.members.first()) {
    const info = qdb.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
    const tiempo = await qdb.get(`afk-${message.mentions.members.first().id}+${message.guild.id}2`)
    if (qdb.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
      message.channel.send(`${message.author}, ${message.mentions.users.first().username} esta en estado afk\nMotivo: ${info}\nAFK: <t:${parseInt(tiempo / 1000)}:R>`)
    }
  }
  //afk///
  if (!message.content.startsWith(prefix)) return;/////////Hacemos una condicional, para que si el mensaje no empieza con el prefijo, no continue con el codigo///////////

  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();///////////Definimos args y command que luego nos servirán/////////////

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  const customcommand = await customschema.findOne({ Guild: message.guild.id, Command: command })
  const Blacklist = require('../../Modelos/Blacklist')
  const Developercmd = require('../../Modelos/usersDev')
  const devcmd = await Developercmd.findOne({ userId: message.author.id })
  const blacklist = await Blacklist.findOne({ userId: message.author.id })
  const ifpremium = await Premium.findOne({ userId: message.author.id })
  if(blacklist){
    return message.reply({content: "Estas en la lista negra, no puedes usar los comandos",allowedMentions:{repliedUser:false}}) // ansiedad ver todo junto
  }
  if (!cmd) {
    if(customcommand) return message.channel.send(customcommand.Response);
    if (!command) return;
    const embed2 = new Discord.MessageEmbed()
      .setTitle("Comando no existente")
      .setDescription(`El comando **"${command}"** no existe`)
      .addField("**Razones Posibles:**", "** - El comando esta mal escrito**\n\n**- El comando no existe**")
      .setColor("RANDOM")
      .setThumbnail("https://c.tenor.com/iUhWHvK_D4AAAAAC/error.gif")
      .setTimestamp()

    message.reply({ embeds: [embed2] })
  }
  

  if(cmd.beta){
    
    if(message.author.id !== "691379190842261515" && message.author.id !== "933753161632587906"){
      message.reply("Este comando es solo para beta testers")
      return;
    }
  }

  if(cmd.developer){
    if(!devcmd && message.author.id !== client.owner){
       message.reply("Este comando es solo para developers o colaboradores")
       return; 
    }
  }
  if(cmd.premium) {
    if(!ifpremium){
      message.reply("🤑 No eres usuario premium, no puedes usar este comando.")
      return;
    }
  }
  if(cmd){
    try {
      cmd.execute(client, message, args)
    } catch (error) {
      message.reply(`Ocurrio un error: \n\`${error}\`\nPor favor contactate con un developer del bot para solucionarlo`)
      client.channels.cache.get("960614245882540152").send({ embeds: [new Discord.MessageEmbed().setTitle("Bug nuevo").setDescription(`Nuevo bug:\n\`${error}\``).addField("Miembro", message.author.tag).addField("ID del miembro", `**${message.author.id}**`).addField("Guild ID/Name", `**${message.guild.name}** | **${message.guild.id}**`).setTimestamp().setColor("RANDOM")] })
    }
  }

    }
}