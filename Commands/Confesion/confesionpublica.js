const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const canalconfesiones = new db.crearDB('confesioneschannel')


module.exports = {
  name: "confesionpublica", 
  alias: [], 

async execute (client, message, args){

  if(!canalconfesiones.tiene(message.guild.id)) return message.channel.send("Este servidor no tiene ningun canal de confesiones establecido!")

  if(!args.join(" ")) return message.channel.send("Debes escribir una confesion anonima!")

  message.delete()

  const usuario = message.author;

  const embed = new Discord.MessageEmbed()
  .setTitle("Confesion")
  .setDescription(args.join(" "))
  .setFooter(`Confesion de ${message.author.tag}`)
  .setTimestamp()
  .setColor("PURPLE")

  const canal = await canalconfesiones.obtener(message.guild.id)
  client.channels.cache.get(canal).send({ embeds: [embed] })


 }

} 