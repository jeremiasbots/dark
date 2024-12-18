const Discord = require('discord.js');
const mongoose = require('mongoose')
const prefixSchema = require('../../Modelos/prefixSchema.js')

module.exports = {
  name: "reset-prefix", 
  alias: [], 
  cooldown: 0,

async execute (client, message, args){

  var perms = message.member.permissions.has("ADMINISTRATOR")
  if(!perms) {
    message.reply("No tienes el permiso `ADMINISTRADOR` por lo tanto no puedes resetear el prefix del bot.")
    return;
  }

  await prefixSchema.findOneAndDelete({ Guild: message.guild.id })
  message.reply('El prefix del bot en este servidor ha sido actualizado a **$**.')

 }

} 