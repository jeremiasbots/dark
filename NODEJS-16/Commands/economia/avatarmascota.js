const Discord = require ('discord.js');
const db = require("megadb")
const dinero = new db.crearDB("dinero")
const dinerobanco = new db.crearDB("dinerobanco")
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")
const mascotas = new db.crearDB("mascotas")

module.exports = {
  name: "avatarmascota", 
  alias:[], 
  developer: false,
  premium: false,
  cooldown: 5000,

async execute (client, message, args) {

  const user = message.author;
  const mascotasperro = await mascotas.obtener(`${message.guild.id}_${user.id}.perros`)
  const mascotaspatos = await mascotas.obtener(`${message.guild.id}_${user.id}.patos`)

  if(!vida.tiene(`${message.guild.id}_${user.id}`)){
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
  }
  
  if(!dinero.tiene(`${message.guild.id}_${user.id}`)){
    dinero.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!dinerobanco.tiene(`${message.guild.id}_${user.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${user.id}`, 0)
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



  if(mascotasperro <= 0 && mascotaspatos <= 0){
     message.channel.send("Se necesita una `Mascota` para poder usar este comando `Para comprarla use $shop transfiera el dinero que vale la Mascota que quiere a efectivo y despues use $buy (la mascota que quiere)`")
     return;
  }

  if(mascotaspatos >= 1){
    const embedpato = new Discord.MessageEmbed()
    .setTitle("Pato")
    .setDescription("Pato fachero 😎")
    .setImage("https://i.ytimg.com/vi/Jd8I_foCu3g/maxresdefault.jpg")
    .setColor("RANDOM")
    .setFooter("Pato fachero 😎")

    message.reply({ embeds: [embedpato] })
  }

  if(mascotasperro >= 1){
    const embedperro = new Discord.MessageEmbed()
    .setTitle("Perro")
    .setDescription("Perro fachero 😎")
    .setImage("https://okdiario.com/img/2021/09/17/perro-655x368.jpg")
    .setColor("RANDOM")
    .setFooter("Perro fachero 😎")

    message.reply({ embeds: [embedperro] })
  }



 }

}