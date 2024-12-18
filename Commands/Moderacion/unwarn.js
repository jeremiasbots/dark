const Discord = require('discord.js');
const warnSchema = require('../../Modelos/warnSchema')

module.exports = {
  name: "unwarn", 
  alias: ["desavisar"], 


 async execute (client, message, args){

    if(!message.member.permissions.has("KICK_MEMBERS")){
        message.reply("No tienes los permisos suficientes para quitar un aviso a alguien.")
        return;
    }

  let usuario = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!usuario) return message.reply(`❌ **No se ha encontrado al usuario que has especificado!**`);
        await asegurar_todo(message.guild.id, usuario.id);
        //definimos razón, y si no hay, la razón será "No se ha especificado ninguna razón!"
        let id_warn = args[1];
        let data = await warnSchema.findOne({ guildID: message.guild.id, userID: usuario.id });
        if (data.warnings.length === 0) return message.reply(`❌ **El usuario que has especificado no tiene ningún warning!**`);
        if (!id_warn) return message.reply(`❌ **No se ha encontrado el warn que has especificado!**`);
        if (isNaN(id_warn) || id_warn < 0) message.reply(`❌ **La ID del warn que has especificado no es válida!**`);
        if(data.warnings[id_warn] == undefined) return message.reply(`❌ **No se ha encontrado el warn que has especificado!**`);

            //comprobamos que el usuario a avisar no es el dueño del servidor
            if (usuario.id == message.guild.ownerId) return message.reply(`❌ **No puedes avisar al DUEÑO del Servidor!**`);

            //comprobar que el BOT está por encima del usuario a avisar
            if (message.guild.me.roles.highest.position > usuario.roles.highest.position) {
                //comprobar que la posición del rol del usuario que ejecuta el comando sea mayor a la persona que vaya a avisar
                if (message.member.roles.highest.position > usuario.roles.highest.position) {

                    message.reply({
                        embeds: [new Discord.MessageEmbed()
                            .setTitle(`✅ Warn removido`)
                            .setDescription(`**Se ha removido el warn con ID \`${id_warn}\` de \`${usuario.user.tag}\` exitosamente!**`)
                            .setColor(client.color)
                            .setTimestamp()
                        ]
                    })
                    data.warnings.splice(id_warn, 1);
                    data.save();
                } else {
                    return message.reply(`❌ **Tu Rol está por __debajo__ del usuario que quieres avisar!**`)
                }
            } else {
                return message.reply(`❌ **Mi Rol está por __debajo__ del usuario que quieres avisar!**`)
            }
        





 }

} 

async function asegurar_todo(guildid, userid){
  if(guildid && userid){
      let warn_data = await warnSchema.findOne({ guildID: guildid, userID: userid })
      if (!warn_data) {
          console.log(`Asegurado: Warnings de ${userid} en ${guildid}`.green);
          warn_data = await new warnSchema({
              guildID: guildid,
              userID: userid,
              warnings: [],
          });
          await warn_data.save();
      }
  }

}