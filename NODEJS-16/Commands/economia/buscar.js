const Discord = require ('discord.js');
const db = require("megadb")
const dinero = new db.crearDB("dinero")
const dinerobanco = new db.crearDB("dinerobanco")
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")
const mascotas = new db.crearDB("mascotas")

let cooldown = new Set()


module.exports = {
  name: "buscar", 
  alias:[], 

async execute (client, message, args) {

  if(cooldown.has(message.author.id)){
    message.channel.send("Debes esperar 5s antes de utilizar el comando de nuevo")
    return;
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  
  }, 5000);

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

  let randomcaramelos = Math.floor(Math.random() * 40) + 5
  let randomhuesos =  Math.floor(Math.random() * 35) + 4

  

  //work normal

  mascotas.sumar(`${message.guild.id}_${user.id}.huesos`, randomhuesos)
  mascotas.sumar(`${message.guild.id}_${user.id}.caramelos`, randomcaramelos)

  const embed = new Discord.MessageEmbed()
  .setTitle("**Buscar**")
  .setDescription(`**${user.tag}** has mandado a tu mascota a buscar cosas y ha encontrado esto:\n\n🍬**Caramelos:** ${randomcaramelos}\n\n🦴**Huesos:** ${randomhuesos}`)
  .setColor("RANDOM")

  message.reply({ embeds: [embed] })



 }

}