const Discord = require('discord.js');
const Premium = require("../../Modelos/UserPremium");
const PremiumCode = require("../../Modelos/Premium");
const ms = require("ms");
const moment = require("moment");

module.exports = {
  name: "canj",
  alias: ["premium"],

  async execute(client, message, args) {

    let Codigo = args[0]

    const usuario = await Premium.findOne({ userId: message.author.id })
    if(usuario){
      if(!usuario.timestamp){
        return message.reply({ content: "Ya cuentas con premium `permanente`", allowedMentions: { repliedUser: false } });
      } else {
        const tiempito = usuario.ctimestamp / 1000
        const tiempaso = usuario.timestamp / 1000
        return message.reply({ content: `Ya cuentas con premium, termina: <t:${parseInt(tiempito + tiempaso)}:R>`, allowedMentions: { repliedUser: false } });
      } // estuve media hora viendo como sacar el tiempo en unix
    }
    if(!Codigo){
      return message.reply({ content: `:x: | \`Debes colocar un codigo\``, allowedMentions: { repliedUser: false } });
    } else {
      const codigo = await PremiumCode.findOne({ code: Codigo });
      if(!codigo){
        return message.reply({ content: `:x: | \`Ese codigo no existe\``, allowedMentions: { repliedUser: false } });
      }
      if(codigo.redemmed){
        return message.reply({ content: `:x: | \`Ese codigo ya fue canjeado\``, allowedMentions: { repliedUser: false } });
      }
      if(codigo.time === 0){
        const dar = new Premium({
          userId: message.author.id
        })
        await dar.save()
        codigo.redemmed = true
        await codigo.save()
        message.reply({ content: `✅ | Codigo canjeado correctamente! Ahora tienes premium \`permanente\``, allowedMentions: { repliedUser: false } });
      } else {
        if(codigo.time === 86400000){
          const dar = new Premium({
            userId: message.author.id,
            timestamp: Date.now(),
            ctimestamp: ms('1d')
          })
          await dar.save()
          codigo.redemmed = true
          await codigo.save()
          message.reply({ content: `✅ | Codigo canjeado correctamente! Tu premium acabara: <t:${parseInt(86400 + Date.now() / 1000)}:R>`, allowedMentions: { repliedUser: false } });
        }
        if(codigo.time === 2592000000){
          const dar = new Premium({
            userId: message.author.id,
            timestamp: Date.now(),
            ctimestamp: ms('30d')
          })
          await dar.save()
          codigo.redemmed = true
          await codigo.save()
          message.reply({ content: `✅ | Codigo canjeado correctamente! Tu premium acabara: <t:${parseInt(2592000 + Date.now() / 1000)}:R>`, allowedMentions: { repliedUser: false } });
        }
        if(codigo.time === 31557600000){
          const dar = new Premium({
            userId: message.author.id,
            timestamp: Date.now(),
            ctimestamp: ms('1y')
          })
          await dar.save()
          codigo.redemmed = true
          await codigo.save()
          message.reply({ content: `✅ | Codigo canjeado correctamente! Tu premium acabara: <t:${parseInt(31557600 + Date.now() / 1000)}:R>`, allowedMentions: { repliedUser: false } });
        }
      }
    }

  }

} 