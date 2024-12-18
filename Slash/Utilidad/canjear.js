const Discord = require("discord.js")
const Premium = require("../../Modelos/UserPremium");
const PremiumCode = require("../../Modelos/Premium");
const PremiumCode2 = require("../../Modelos/PremiumUltra.js")
const Ultra = require("../../Modelos/UserUltra.js")
const ms = require("ms");
const moment = require("moment");

module.exports = {
    name: "canjear",
    description: "Canjea una clave premium",
    type: 1,
    options: [
        {
          name: "tipo",
          description: "Tipo de clave premium",
          type: 3,
          required: true,
          choices: [
            {
              name: "Premium Classic",
              value: "classic"
            },
            {
              name: "Premium",
              value: "premium"
            }
          ]
        },
        {
            name: "clave",
            description: "La clave premium",
            type: 3,
            required: true
        }
    ],

    async aplication(interaction, client){
      if(interaction.options.getString("tipo") === "classic"){
        let Codigo = interaction.options.getString("clave")

    const usuario = await Premium.findOne({ userId: interaction.user.id })
    if(usuario){
      if(!usuario.timestamp){
        return interaction.reply({ content: "Ya cuentas con premium `permanente`", ephemeral: true });
      } else {
        const tiempito = usuario.ctimestamp / 1000
        const tiempaso = usuario.timestamp / 1000
        return interaction.reply({ content: `Ya cuentas con premium, termina: <t:${parseInt(tiempito + tiempaso)}:R>`, ephemeral: true });
      } // estuve media hora viendo como sacar el tiempo en unix
    }
    if(!Codigo){
      return interaction.reply({ content: `:x: | \`Debes colocar un codigo\``, ephemeral: true });
    } else {
      const codigo = await PremiumCode.findOne({ code: Codigo });
      if(!codigo){
        return interaction.reply({ content: `:x: | \`Ese codigo no existe\``, ephemeral: true });
      }
      if(codigo.redemmed){
        return interaction.reply({ content: `:x: | \`Ese codigo ya fue canjeado\``, ephemeral: true });
      }
      if(codigo.time === 0){
        const dar = new Premium({
          userId: interaction.user.id
        })
        await dar.save()
        codigo.redemmed = true
        await codigo.save()
        interaction.reply({ content: `✅ | Codigo canjeado correctamente! Ahora tienes premium \`permanente\``, ephemeral: true });
      } else {
        if(codigo.time === 86400000){
          const dar = new Premium({
            userId: interaction.user.id,
            timestamp: Date.now(),
            ctimestamp: ms('1d')
          })
          await dar.save()
          codigo.redemmed = true
          await codigo.save()
          interaction.reply({ content: `✅ | Codigo canjeado correctamente! Tu premium acabara: <t:${parseInt(86400 + Date.now() / 1000)}:R>`, ephemeral: true });
        }
        if(codigo.time === 2592000000){
          const dar = new Premium({
            userId: interaction.user.id,
            timestamp: Date.now(),
            ctimestamp: ms('30d')
          })
          await dar.save()
          codigo.redemmed = true
          await codigo.save()
          interaction.reply({ content: `✅ | Codigo canjeado correctamente! Tu premium acabara: <t:${parseInt(2592000 + Date.now() / 1000)}:R>`, ephemeral: true });
        }
        if(codigo.time === 31557600000){
          const dar = new Premium({
            userId: interaction.user.id,
            timestamp: Date.now(),
            ctimestamp: ms('1y')
          })
          await dar.save()
          codigo.redemmed = true
          await codigo.save()
          interaction.reply({ content: `✅ | Codigo canjeado correctamente! Tu premium acabara: <t:${parseInt(31557600 + Date.now() / 1000)}:R>`, ephemeral: true });
        }
      }
    }
  } else if(interaction.options.getString("tipo") === "premium"){
    let Codigo = interaction.options.getString("clave")

    const usuario = await Ultra.findOne({ guildId: interaction.guild.id })
    if(usuario){
      if(!usuario.timestamp){
        return interaction.reply({ content: "El servidor ya cuenta con premium `permanente`", ephemeral: true });
      } else {
        const tiempito = usuario.ctimestamp / 1000
        const tiempaso = usuario.timestamp / 1000
        return interaction.reply({ content: `El servidor ya cuenta con premium, termina: <t:${parseInt(tiempito + tiempaso)}:R>`, ephemeral: true });
      } // estuve media hora viendo como sacar el tiempo en unix
    }
    if(!Codigo){
      return interaction.reply({ content: `:x: | \`Debes colocar un codigo\``, ephemeral: true });
    } else {
      const codigo = await PremiumCode2.findOne({ code: Codigo });
      if(!codigo){
        return interaction.reply({ content: `:x: | \`Ese codigo no existe\``, ephemeral: true });
      }
      if(codigo.redemmed){
        return interaction.reply({ content: `:x: | \`Ese codigo ya fue canjeado\``, ephemeral: true });
      }
      if(codigo.time === 0){
        const ya = await Premium.findOne({ userId: interaction.user.id })
        if(ya){
          await Premium.findOneAndDelete({ userId: interaction.user.id })
          const dar = new Premium({
            userId: interaction.user.id
          })
          await dar.save()
          const ok = new Ultra({
            guildId: interaction.guild.id
          })
          await ok.save()
        codigo.redemmed = true
        await codigo.save()
        interaction.reply({ content: `✅ | Codigo canjeado correctamente! Ahora tienes premium \`permanente\``, ephemeral: true });
        return;
        }
        const dar = new Premium({
          userId: interaction.user.id
        })
        await dar.save()
        const ok = new Ultra({
          guildId: interaction.guild.id
        })
        await ok.save()
      codigo.redemmed = true
      await codigo.save()
      interaction.reply({ content: `✅ | Codigo canjeado correctamente! Ahora tienes premium \`permanente\``, ephemeral: true });
      } else {
        if(codigo.time === 86400000){
          const dar = new Premium({
            userId: interaction.user.id,
            timestamp: Date.now(),
            ctimestamp: ms('1d')
          })
          await dar.save()
          codigo.redemmed = true
          await codigo.save()
          interaction.reply({ content: `✅ | Codigo canjeado correctamente! Tu premium acabara: <t:${parseInt(86400 + Date.now() / 1000)}:R>`, ephemeral: true });
        }
        if(codigo.time === 2592000000){
          const dar = new Premium({
            userId: interaction.user.id,
            timestamp: Date.now(),
            ctimestamp: ms('30d')
          })
          await dar.save()
          codigo.redemmed = true
          await codigo.save()
          interaction.reply({ content: `✅ | Codigo canjeado correctamente! Tu premium acabara: <t:${parseInt(2592000 + Date.now() / 1000)}:R>`, ephemeral: true });
        }
        if(codigo.time === 31557600000){
          const dar = new Premium({
            userId: interaction.user.id,
            timestamp: Date.now(),
            ctimestamp: ms('1y')
          })
          await dar.save()
          codigo.redemmed = true
          await codigo.save()
          interaction.reply({ content: `✅ | Codigo canjeado correctamente! Tu premium acabara: <t:${parseInt(31557600 + Date.now() / 1000)}:R>`, ephemeral: true });
        }
      }
    }

  }
    }
}