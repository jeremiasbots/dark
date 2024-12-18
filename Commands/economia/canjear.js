const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")
const picoobjeto = new db.crearDB("picoobjeto")
const canaobjeto = new db.crearDB("canaobjeto")
const mascotas = new db.crearDB("mascotas")

module.exports = {
  name: "canjeo", 
  alias: ["canjear"], 
  premium: false,
  cooldown: 3000,

 async execute (client, message, args){

     const userblack = message.author;

  if(blacklist.has(userblack.id)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  const user =  message.author;

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

  if(!mascotas.tiene(`${message.guild.id}_${user.id}.caramelos`)){
    mascotas.establecer(`${message.guild.id}_${user.id}.caramelos`, 0)
  }

  if(!mascotas.tiene(`${message.guild.id}_${user.id}.huesos`)){
    mascotas.establecer(`${message.guild.id}_${user.id}.huesos`, 0)
  }

  const objeto = args.join(' ')
  if(!objeto) return message.channel.send("Escribe un objeto!")

  const dinerohuesos = await mascotas.obtener(`${message.guild.id}_${user.id}.huesos`)
  const dinerocaramelos = await mascotas.obtener(`${message.guild.id}_${user.id}.caramelos`)

  if(objeto === '500$'){
    
    if(dinerocaramelos < 5 || dinerohuesos < 10) return message.reply("No tienes dinero para canjear el item `500$`")

    mascotas.restar(`${message.guild.id}_${user.id}.caramelos`, 5)
    mascotas.restar(`${message.guild.id}_${user.id}.huesos`, 10)

    message.reply("Has canjeado `500$`")

    dinero.sumar(`${message.guild.id}_${user.id}`, 500)
  }


  if(objeto === '1000$'){

  if(dinerocaramelos < 10 || dinerohuesos < 20) return message.reply("No tienes dinero para canjear el item `1000$`")

   mascotas.restar(`${message.guild.id}_${user.id}.caramelos`, 10)
   mascotas.restar(`${message.guild.id}_${user.id}.huesos`, 20)

   message.reply("Has canjeado `1000$`")

   dinero.sumar(`${message.guild.id}_${user.id}`, 1000)
  }

  if(objeto === '5000$'){

  if(dinerocaramelos < 50 || dinerohuesos < 300) return message.reply("No tienes dinero para canjear el item `5000$`")

   mascotas.restar(`${message.guild.id}_${user.id}.caramelos`, 50)
   mascotas.restar(`${message.guild.id}_${user.id}.huesos`, 300)

   message.reply("Has canjeado el item `5000$`")

   dinero.sumar(`${message.guild.id}_${user.id}`, 5000)
  }

  if(objeto === '50000$'){

  if(dinerocaramelos < 30000 || dinerohuesos < 45000) return message.reply("No tienes dinero para canjear el item `50000$`")

   mascotas.restar(`${message.guild.id}_${user.id}.caramelos`, 30000)
   mascotas.restar(`${message.guild.id}_${user.id}.caramelos`, 45000)

   message.reply("Has canjeado el item `50000$`")


   dinero.sumar(`${message.guild.id}_${user.id}`, 50000)
  }

  
 }

} 