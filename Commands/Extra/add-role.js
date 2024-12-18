const Discord = require("discord.js");

module.exports = {
  name: "add-role", 
  alias:[], 

async execute (client, message, args) {

  if(message.guild.ownerId !== message.author.id) return message.reply("Solo el owner puede utilizar este comando.")

  let usuario = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
  if (!usuario) return message.reply(`❌ **No se ha encontrado al usuario que has especificado!**`);
  //definimos razón, y si no hay, la razón será "No se ha especificado ninguna razón!"
  let rol = message.guild.roles.cache.get(args[1])
  if(!rol){
    message.reply("Di un rol para agregarle al usuario.")
    return;
  }

  //comprobamos que el usuario a avisar no es el dueño del servidor

  //comprobar que el BOT está por encima del usuario a avisar
          //enviamos al usuario por privado que ha sido avisado!

          usuario.roles.add(rol)

          message.reply("Se le agregado el rol al usuario correctamente")
          //creamos el objeto del warn
         



}

}
