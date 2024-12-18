const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')


module.exports = {
  name: "sus", 
  alias: [], 

execute (client, message, args){

  

  message.channel.send("admins")


 }

} 