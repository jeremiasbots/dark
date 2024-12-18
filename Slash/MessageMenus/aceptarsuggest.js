const Discord = require("discord.js")
const Schema = require("../../Modelos/votosModel.js")
const Schematwo = require("../../Modelos/sugerenciasModel.js")

module.exports = {
    name: "Aceptar",
    type: 3,
    perms: "MANAGE_GUILD",
    /**
     * @param {Discord.Interaction} interaction
     * @param {Discord.Client} client
     */

    async aplication(interaction, client){
        const mensaje = interaction.targetId


        const datasugs = await Schematwo.findOne({ guild: interaction.guild.id })

        if(!datasugs || !datasugs.canal) return interaction.reply({ content: "Este servidor no tiene ningun canal de sugerencias", ephemeral: true })


        const primerdata = await Schema.findOne({ mensaje: mensaje })
        if(!primerdata) return interaction.reply({ content: "Ese mensaje no es una sugerencia", ephemeral: true })

        const sugerencias = await client.channels.cache.get(datasugs.canal).messages.fetch(mensaje)


        const persona = primerdata.author
        const usuarioxd = await client.users.resolveId(persona)
        if(!usuarioxd) return interaction.reply({ content: "No se ha encontrado a la persona!", ephemeral: true })

        const usuario = await client.users.fetch(persona)

        const contenido = primerdata.contenido
        

        const embedaceptar = new Discord.MessageEmbed()
          .setTitle("Sugerencia aceptada")
          .setDescription(`**${contenido}**\n\nMotivo: No especificado`)
          .setFooter({ text: `Aprobada por ${interaction.user.tag}, hecha por ${usuario.tag}` })
          .setThumbnail(usuario.displayAvatarURL({ size: 1024, dynamic: true }))
          .setColor("GREEN")
          
          const rowsugs = new Discord.MessageActionRow()
          .addComponents(
              new Discord.MessageSelectMenu()
              .setCustomId("menusugerencias")
              .setMinValues(1)
              .setMaxValues(1)
              .setPlaceholder("Ver votos")
              .addOptions([
                  {
                    label: "ℹ Ver votos",
                    description: "Ver quien ha votado y por que voto",
                    value: "ver",
                    emoji: "ℹ"
                  }
              ])
          )
          sugerencias.edit({ embeds: [embedaceptar], components: [rowsugs] })

          interaction.reply({ content: `La sugerencia ha sido aceptada`, ephemeral: true })

          const obteneracept = datasugs.canal

          usuario.send({ embeds: [new Discord.MessageEmbed().setTitle("Sugerencia aceptada").setDescription(`Tu sugerencia en **${interaction.guild.name}** ha sido aceptada | [ID DEL MENSAJE](https://discord.com/channels/${interaction.guildId}/${obteneracept}/${mensaje})`)] })


    }
}