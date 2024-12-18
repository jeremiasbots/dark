const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")
const picoobjeto = new db.crearDB("picoobjeto")
const canaobjeto = new db.crearDB("canaobjeto")
const mascotas = new db.crearDB("mascotas")
const computer = new db.crearDB("computerobjeto")

let cooldown = new Set()

module.exports = {
  name: "buy", 
  alias: ["comprar"], 

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

  if(!mascotas.tiene(`${message.guild.id}_${user.id}`)){
    mascotas.establecer(`${message.guild.id}_${user.id}.perros`, 0)
  }

  if(!mascotas.tiene(`${message.guild.id}_${user.id}`)){
    mascotas.establecer(`${message.guild.id}_${user.id}.patos`, 0)
  }

  if(!computer.tiene(`${message.guild.id}_${user.id}`)){
    computer.establecer(`${message.guild.id}_${user.id}.computadoras`, 0)
  }

  const objeto = args.join(' ')
  if(!objeto) return message.channel.send("Escribe un objeto!")

  const dinerouser = await dinero.obtener(`${message.guild.id}_${user.id}`)
  const perrostotales = await mascotas.obtener(`${message.guild.id}_${user.id}.perros`)
  const patostotales = await mascotas.obtener(`${message.guild.id}_${user.id}.patos`)
  const computadorastotales = await mascotas.obtener(`${message.guild.id}_${user.id}.computadoras`)


  if(objeto === 'Aguita'){
    
    if(dinerouser < 20) return message.channel.send("No tienes dinero para comprar el item `Aguita`")

    dinero.restar(`${message.guild.id}_${user.id}`, 20)

    message.channel.send("Has comprado el item `Aguita` **y te la has tomado `Ahora tienes 15 de Vida`**")

    vida.sumar(`${message.guild.id}_${user.id}`, 15)
  }


  if(objeto === 'Galleta'){

  if(cooldown.has(message.author.id)){
    message.channel.send("Debes esperar 2h antes de comprar el item `Galleta` de nuevo")
    return;
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  
  }, 7200000);

  if(dinerouser < 50) return message.channel.send("No tienes dinero para comprar el item `Galleta`")

   dinero.restar(`${message.guild.id}_${user.id}`, 50)

   message.channel.send("Has comprado una Galleta y **te has comido ahora tienes 35 de vida**")

   vida.sumar(`${message.guild.id}_${user.id}`, 35)
  }

  if(objeto === 'Computadora'){

  if(computadorastotales == 1){
    return message.channel.send("Usted ya tiene una `Computadora`")
  }

  if(dinerouser < 100) return message.channel.send("No tienes dinero para comprar el item `Computadora`")

   dinero.restar(`${message.guild.id}_${user.id}`, 100)

   message.channel.send(`Has comprado una computadora **ahora podras hacer cosas con ella y ganar dinero**`)
   
   computer.sumar(`${message.guild.id}_${user.id}.computadoras`, 1)
  }

  if(objeto === 'iPhone'){

  const randomdineroiphone = Math.floor(Math.random() * 100) + 10

  if(dinerouser < 350) return message.channel.send("No tienes dinero para comprar el item `iPhone`")

   dinero.restar(`${message.guild.id}_${user.id}`, 350)

   message.channel.send(`Has comprado un iPhone y **has influido en redes sociales generaste ${randomdineroiphone}**`)
   dinero.sumar(`${message.guild.id}_${user.id}`, randomdineroiphone)
  }

  if(objeto === 'Pico'){

  if(dinerouser < 1500) return message.channel.send("No tienes dinero para comprar el item `Pico`")

   dinero.restar(`${message.guild.id}_${user.id}`, 1500)

   message.channel.send(`Has comprado un Pico **ahora puedes usar el comando $mine para minar cosas**`)

   picoobjeto.sumar(`${message.guild.id}_${user.id}`, 1)
  }

  if(objeto === 'Caña'){

  if(dinerouser < 3000) return message.channel.send("No tienes dinero para comprar el item `Caña`")

   dinero.restar(`${message.guild.id}_${user.id}`, 3000)

   message.channel.send(`Has comprado una Caña **ahora puedes pescar cosas para ganar mucho dinero**`)

   canaobjeto.sumar(`${message.guild.id}_${user.id}`, 1)
  }

  if(objeto === 'Perro'){

  if(perrostotales === 1 || patostotales === 1){
    message.channel.send("Entrego a su mascota a la muerte ahora usted se ira conmigo")
    dinero.establecer(`${message.guild.id}_${user.id}`, 0)
    dinerobanco.establecer(`${message.guild.id}_${user.id}`, 0)
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
    picoobjeto.establecer(`${message.guild.id}_${user.id}`, 0)
    canaobjeto.establecer(`${message.guild.id}_${user.id}`, 0)
    mascotas.establecer(`${message.guild.id}_${user.id}.perros`, 0)
    mascotas.establecer(`${message.guild.id}_${user.id}.patos`, 0)
    mascotas.establecer(`${message.guild.id}_${user.id}.huesos`, 0)
    mascotas.establecer(`${message.guild.id}_${user.id}.caramelos`, 0)
    return;
  }

  if(dinerouser < 7000) return message.channel.send("No tienes dinero para comprar el item `Perro`")


   dinero.restar(`${message.guild.id}_${user.id}`, 7000)

   message.channel.send(`Has comprado un Perro **ahora puedes usarlo para que busque cosas**`)

   mascotas.sumar(`${message.guild.id}_${user.id}.perros`, 1)
  }

  if(objeto === 'Pato'){

  if(perrostotales === 1 || patostotales === 1){
    message.channel.send("Entrego a su mascota a la muerte ahora usted se ira conmigo")
    dinero.establecer(`${message.guild.id}_${user.id}`, 0)
    dinerobanco.establecer(`${message.guild.id}_${user.id}`, 0)
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
    picoobjeto.establecer(`${message.guild.id}_${user.id}`, 0)
    canaobjeto.establecer(`${message.guild.id}_${user.id}`, 0)
    mascotas.establecer(`${message.guild.id}_${user.id}.perros`, 0)
    mascotas.establecer(`${message.guild.id}_${user.id}.patos`, 0)
    mascotas.establecer(`${message.guild.id}_${user.id}.huesos`, 0)
    mascotas.establecer(`${message.guild.id}_${user.id}.caramelos`, 0)
    return;
  }

  if(dinerouser < 7000) return message.channel.send("No tienes dinero para comprar el item `Pato`")


   dinero.restar(`${message.guild.id}_${user.id}`, 7000)

   message.channel.send(`Has comprado un Pato Fachero 😎 **ahora puedes usarlo para que busque cosas**`)

   mascotas.sumar(`${message.guild.id}_${user.id}.patos`, 1)
  }

 }

} 