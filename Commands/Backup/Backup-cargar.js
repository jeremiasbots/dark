const { MessageEmbed, MessageActionRow, Message, MessageButton, Client } = require("discord.js");
const GBC = require('../../Modelos/GuildBackupCreate');
const Premium = require("../../Modelos/UserPremium.js");

module.exports = {
  name: "backup-cargar",
  alias: ["servidor-cargar"],

  async execute(client, message, args) {

    if(message.guild.ownerId !== message.author.id){
      return message.reply({ content: ":x: | `Solo el dueño del servidor puede usar este comando`"})
    }
    if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
      return message.channel.send({ content: "No tengo permisos de __administrador__ para ejecutar esto." });
    }

    
  const UserIsPremium = await Premium.findOne({ userId: message.author.id });
  if(!UserIsPremium) {
    return message.reply({ content: "Este comando es de uso `premium`!" });
  }

    const emojis = "<:monedadeperro:935896275038134293>"

    const backupId = args[0]
    if(!backupId) {
      return message.channel.send({ content: "¡Tienes que proporcionar una id!" });
    }
    const backupSearch = await GBC.findOne({ backupId: backupId });
    if(!backupSearch) {
      return message.channel.send({ content: "¡Tienes que proporcionar una id valida!" });
    } else {
      if(backupSearch.authorId !== message.author.id) {
        message.channel.send({ content: "¡Esa backup no te pertenece!" });
      } else {
        let msg = await message.channel.send({
          "embeds": [
            {
              "title": "⚠ - Advertencia, confirmar acción.",
              "description": "`-` ¿Estas seguro de que quieres cargar esta backup?\n\n`❔` **>** `Efectos de la backup:`\n```Eliminar canales, Eliminar roles, Eliminar emojis, Crear canales, Crear roles, Crear emojis, Crear Baneos```\n`ATENCIÓN: TODO TU PROGRESO EN EL SERVIDOR SE RESTAURARA.`",
              "color": 16757052,
              "footer": {
                "text": "Reacciona con ✅ para continuar | Reacciona con ❌ para cancelar."
              }
            }
          ]
        });
        msg.react('✅');
        msg.react('❌');
        const rFilter = (r, user) => {
          return ['✅', '❌'].includes(r.emoji.name) && user.id === message.author.id;
        }
        const collected = await msg.awaitReactions({ filter: rFilter, max: 1, time: 120000 });
        const reaction = collected.first().emoji.name;
        if(reaction === "✅") {
          msg.edit({ content: `${emojis} | \`Estoy cargando la backup...\``, embeds: [] });
          msg.reactions.removeAll();
          message.guild.setName("Cargando...");
          setTimeout(async () => {
            const bld = await backup.load(backupId, message.guild, {
              maxMessagesPerChannel: 5
            }).catch(e => {});
          }, 5000)
        } else {
          msg.reactions.removeAll();
        }
      }
    }

  }

} 