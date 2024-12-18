const Discord = require('discord.js');
const mongoose = require('mongoose')
const prefixSchema = require('../../Modelos/prefixSchema.js')

module.exports = {
  name: "setprefix", 
  alias: [], 

async execute (client, message, args){

  var perms = message.member.permissions.has("ADMINISTRATOR")
  if(!perms) {
    message.reply("No tienes el permiso `ADMINISTRADOR` por lo tanto no puedes poner un nuevo prefix para el bot.")
    return;
  }

  const res = args.join(" ")
  if(!res) return message.reply("Por favor especifica un nuevo prefix para el bot.")

  prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
    if(err) throw err;
    if(data) {
      await prefixSchema.findOneAndDelete({ Guild: message.guild.id })
      data = new prefixSchema({
        Guild: message.guild.id,
        Prefix: res
      })
      data.save()
      message.reply(`El nuevo prefix del bot para este servidor ha sido actualizado a  **${res}**`)
    } else {
      data = new prefixSchema({
        Guild: message.guild.id,
        Prefix: res
      })
      data.save()
      message.reply(`El prefix del bot para este servidor ahora es **${res}**`)
    }
  })
 

 }

} 