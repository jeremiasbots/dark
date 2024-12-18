const Discord = require ('discord.js');
const db = require("megadb")
const dinero = new db.crearDB("dinero")
const dinerobanco = new db.crearDB("dinerobanco")
const vida = new db.crearDB("vida")
const blacklist = new db.crearDB("blacklist")
const picoobjeto = new db.crearDB("picoobjeto")
const canaobjeto = new db.crearDB("canaobjeto")
const mascotas = new db.crearDB("mascotas")
const computer = new db.crearDB("computerobjeto")

module.exports = {
  name: "bal", 
  alias: ["money"], 

async execute (client, message, args){

  const userblack = message.author;
  const vidatime = await vida.obtener(`${message.guild.id}_${userblack.id}`)

  if(blacklist.has(userblack.id)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  const user = message.mentions.members.first() || message.author;
  const member = message.mentions.members.first() || message.author;
  const usuario = message.mentions.members.first() 
  const userbal = message.author;

  if(!vida.tiene(`${message.guild.id}_${user.id}`)){
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
  }

  if(!dinero.tiene(`${message.guild.id}_${user.id}`)){
    dinero.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!dinerobanco.tiene(`${message.guild.id}_${user.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!picoobjeto.tiene(`${message.guild.id}_${user.id}`)){
    picoobjeto.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!canaobjeto.tiene(`${message.guild.id}_${user.id}`)){
    canaobjeto.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!mascotas.tiene(`${message.guild.id}_${user.id}.perros`)){
    mascotas.establecer(`${message.guild.id}_${user.id}.perros`, 0)
  }

  if(!mascotas.tiene(`${message.guild.id}_${user.id}.patos`)){
    mascotas.establecer(`${message.guild.id}_${user.id}.patos`, 0)
  }

  if(!mascotas.tiene(`${message.guild.id}_${user.id}.huesos`)){
    mascotas.establecer(`${message.guild.id}_${user.id}.huesos`, 0)
  }

  if(!mascotas.tiene(`${message.guild.id}_${user.id}.caramelos`)){
    mascotas.establecer(`${message.guild.id}_${user.id}.caramelos`, 0)
  }

  if(!computer.tiene(`${message.guild.id}_${user.id}.computadoras`)){
    computer.establecer(`${message.guild.id}_${user.id}.computadoras`, 0)
  }

  const dinerototal = await dinero.obtener(`${message.guild.id}_${user.id}`)
  const dinerobancototal = await dinerobanco.obtener(`${message.guild.id}_${user.id}`)
  const vidatotal = await vida.obtener(`${message.guild.id}_${user.id}`)
  const picostotales = await picoobjeto.obtener(`${message.guild.id}_${user.id}`)
  const canastotales = await canaobjeto.obtener(`${message.guild.id}_${user.id}`)
  const perrostotales = await mascotas.obtener(`${message.guild.id}_${user.id}.perros`)
  const patostotales = await mascotas.obtener(`${message.guild.id}_${user.id}.patos`)
  const computadorastotales = await computer.obtener(`${message.guild.id}_${user.id}.computadoras`)
  const huesostotales = await mascotas.obtener(`${message.guild.id}_${user.id}.huesos`)
  const caramelostotales = await mascotas.obtener(`${message.guild.id}_${user.id}.caramelos`)


  if(dinerototal >= 1000000000){
    const dinerototal = "∞"
  }

  if(dinerobancototal >= 1000000000){
    const dinerobancototal = "∞"
  }
  




  const embed = new Discord.MessageEmbed()
  .setTitle(message.author.tag)
  .setDescription(`Dinero: **${dinerototal}$** \n\nDinero en el banco: **${dinerobancototal}$**  \n\nTotal: **${dinerototal + dinerobancototal}$**\n\nVida: **${vidatotal}**\n\n**OBJETOS:**\n\n**Picos:** ${picostotales}\n\n**Cañas:** ${canastotales}\n\n**Huesos:** ${huesostotales}\n\n**Caramelos:** ${caramelostotales}\n\n**Computadoras:** ${computadorastotales}\n\n**MASCOTAS:**\n\n**Perros:** ${perrostotales}\n\n**Patos:** ${patostotales}`)
  .setColor("RED")
  .setTimestamp()
  .setFooter("Más actualizaciones proximamente")
  .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

  message.reply({ embeds: [embed] })

 }

} 