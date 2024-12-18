const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const db = require("megadb")
const { discriminator } = require('../../Modelos/userEconomia')
const canalsugerencia = new db.crearDB("canalsugerencia")
const autor = new db.crearDB("autor")
const sugerencia = new db.crearDB("sugerencia")

module.exports = {
    name: "sugerir",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Sugiere una sugerencia",
    type: 1,
    options: [{
        name: "sugerencia",
        description: "La sugerencia que vas a enviar",
        type: 3,
        required: true
    }],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){

        if(!canalsugerencia.tiene(interaction.guild.id)) return interaction.reply({ content: "Este servidor no tiene ningun canal de sugerencias!", ephemeral: true })

        const suges = interaction.options.getString("sugerencia")
      
      
        const usuario = interaction.user

        interaction.reply({ content: "Tu sugerencia ha sido enviada al canal de sugerencias", ephemeral: true })
      
        const embed = new Discord.MessageEmbed()
      
        .setTitle("Nueva sugerencia")
        .setDescription(suges)
        .setThumbnail(usuario.displayAvatarURL({ size: 1024, dynamic: true }))
        .setFooter({ text: `Por ${usuario.tag}` })
        .setTimestamp()
        .setColor("ORANGE")

      
        const canal = await canalsugerencia.obtener(interaction.guild.id)
        client.channels.cache.get(canal).send({ embeds: [embed] }).then(msg => {
          msg.react("✅")
          msg.react("❌")
          msg.react("😅")
          autor.establecer(msg.id, usuario.id)
          sugerencia.establecer(msg.id, suges)
        })

    }
}