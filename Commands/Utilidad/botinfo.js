const Discord = require('discord.js');
const { utc } = require('moment')
const package = require('../../package.json')
const os = require('os')
const dev = require('./../../Modelos/usersDev')

module.exports = {
  name: "botinfo", 
  alias: [], 
  cooldown: 5,

async execute (client, message, args){

  const core = os.cpus()[0];
  
  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds & 60;
  let uptime = `${days.toFixed()} dias / ${hours.toFixed()} horas / ${minutes.toFixed()} minutos / ${seconds.toFixed()} segundos`;
  
  let avatar = message.author.displayAvatarURL({format: 'png'})

  let ping = client.ws.ping

  let servers = client.guilds.cache.size

  let users = client.users.cache.size

  let channels = client.channels.cache.size

  /**const embed = new Discord.MessageEmbed()
  .setTitle(`Info del bot`)
  .setDescription(`INFO DEL BOT`)
  .addField("Estoy en linea:", `${uptime}`)
  .addField("Servers:", `${servers + 1}`)
  .addField("Usuarios Activos:", `${users}`)
  .addField("Ping:", `${ping}`)
  .addField("Canales de los servers:", `${channels}`)
  .addField("Node.js version", `${process.version}`)
  .addField("CPU:", `Cores: ${os.cpus().length}\n Speed: ${core.speed}MhZ\n Model: ${core.model}`)
  .addField("OWNER DEL BOT", "JeremiasBots#2622")
  .setThumbnail(avatar)
  .setColor("ORANGE")
  .setFooter("INFORMACION SOLO PARA EL CREADOR") Por si no completo este xd*/

  const info = new Discord.MessageEmbed()
  .setTitle("Informacion")
  .setColor("DARK_BLUE")
  .addFields(
    { name: "👑 | Owner", value: `\`\`\`${client.users.cache.get("691379190842261515").tag}\`\`\``},
    { name: `🎈 | Version`, value: `\`\`\`v${package.version}\`\`\``},
    { name: "👓 | Node", value: `\`\`\`${process.version}\`\`\``},
    { name: "🕔 | Uptime", value: `\`\`\`${days.toFixed()} dias, ${hours.toFixed()} horas y ${minutes.toFixed()} minutos\`\`\``},
    { name: "👤 | Usuarios", value: `\`\`\`${users}\`\`\``},
    { name: "🚀 | Servidores", value: `\`\`\`${servers}\`\`\``},
    { name: "💎 | WS Ping", value: `\`\`\`${ping}ms\`\`\``},
    { name: "🤖 | PC", value: `\`\`\`css\n[Cores] - [${os.cpus().length}]\n[Speed] - [${core.speed}MhZ]\n[Modelo] - [${core.model}]\`\`\``}
  )//dice que es la v16 cuando tengo la v17 xD | ni idea, guarda cambios

  message.reply({ embeds: [info], allowedMentions: { repliedUser: false } })//hagamos una lista XD bueno primero tons el owner y luego veo como pusiste la db


 }

} 