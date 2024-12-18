const Discord = require ('discord.js');
const db = require("megadb")
const dinero = new db.crearDB("dinero")
const dinerobanco = new db.crearDB("dinerobanco")
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")

let cooldown = new Set()


module.exports = {
  name: "work", 
  alias:["w"], 

async execute (client, message, args) {

  const userblack = message.author;

  if(blacklist.has(userblack.id)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  if(cooldown.has(message.author.id)){
    message.channel.send("Debes esperar 2m antes de utilizar el comando de nuevo")
    return;
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  
  }, 120000);

  const user = message.author;

  if(!vida.tiene(`${message.guild.id}_${user.id}`)){
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
  }
  
  if(!dinero.tiene(`${message.guild.id}_${user.id}`)){
    dinero.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!dinerobanco.tiene(`${message.guild.id}_${user.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  let random = Math.floor(Math.random() * 575) + 100
  

  let trabajo = ['Policia', 'Bombero', 'Editor', 'Arquitecto', 'Actor']
  let randomtrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]

  

  //work normal

  dinero.sumar(`${message.guild.id}_${user.id}`, random)

  const embed = new Discord.MessageEmbed()
  .setTitle("TRABAJO")
  .setDescription(`**${user.tag}** has trabajado como **${randomtrabajo}** y has conseguido **${random}**`)
  .setColor("GREEN")

  message.reply({ embeds: [embed] })



 }

}