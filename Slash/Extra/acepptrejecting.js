const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const Schema = require("../../Modelos/votosModel.js")
const Schematwo = require("../../Modelos/sugerenciasModel.js")
const SchemaRoles = require("../../Modelos/rolesStaffs.js")

module.exports = {
    name: "acepptrejectingsuggest",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Acepta o rechaza una sugerencia",
    type: 1,
    options: [
        {
            name: "accion",
            description: "La accion que vas a hacer (aceptar/rechazar)",
            type: 3,
            required: true,
            choices: [
                {
                    name: "aceptar",
                    value: "accept"
                },
                {
                    name: "rechazar",
                    value: "bye"
                }
            ]
        },
        {
            name: "id",
            description: "El id de la sugerencia",
            type: 3,
            required: true 
        },
        {
            name: "motivo",
            description: "El motivo porque vas a aceptar/rechazar la sugerencia",
            type: 3
        }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){

        const rolesdata = await SchemaRoles.findOne({ guildId: interaction.guild.id })

        if(rolesdata.roles !== []){
            if(!interaction.member.roles.cache.some(r => rolesdata.roles.includes(r))){
                interaction.reply({ content: "No puedes usar este comando", ephemeral: true })
                return;
            }
        } else if(!rolesdata || rolesdata.roles === [] || !rolesdata.roles){
            var perms = interaction.member.permissions.has("MANAGE_GUILD")
        if(!perms){
           interaction.reply({ content: "No tienes los permisos para aceptar sugerencias!", ephemeral: true })
           return;
        } 
        }
      
        const accion = interaction.options.getString("accion")
        
        const mensaje = interaction.options.getString("id")
        if(isNaN(mensaje)){
          return interaction.reply({ content: "Esta no es una id", ephemeral: true })
        }

        const datasugs = await Schematwo.findOne({ guild: interaction.guild.id })
      
        if(!datasugs) return interaction.reply({ content: "Este servidor no tiene ningun canal de sugerencias!", ephemeral: true })
        const canal = datasugs.canal


        const primerdata = await Schema.findOne({ mensaje: mensaje })
        if(!primerdata) return interaction.reply({ content: "Ese mensaje no es una sugerencia", ephemeral: true })

        const sugerencias = await client.channels.cache.get(canal).messages.fetch(mensaje)
        if(!sugerencias) return interaction.reply({ content: "No he encontrado la sugerencia", ephemeral: true })
      
        const persona = primerdata.author
        const usuario = client.users.resolve(persona)
        if(!usuario) return interaction.reply({ content: "No se ha encontrado a la persona!", ephemeral: true })
      
        const contenido = primerdata.contenido
        let motivo = interaction.options.getString("motivo")
         if(!motivo){
            motivo = 'No especificado'
         }

        

        switch(accion) {
            case "accept":
                const embedaceptar = new Discord.MessageEmbed()
          .setTitle("Sugerencia aceptada")
          .setDescription(`**${contenido}**\n\nMotivo: **${motivo}**`)
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
              break;
            case "bye":
                const embedrechazar = new Discord.MessageEmbed()
                .setTitle(`${usuario.tag}`)
                .setDescription(`Sugerencia rechazada <:olvidame:947524793442390086>\n\n<:soldadodedarkbot:942875300021297253> Rechazada por: **${interaction.user.tag}**\n\nMotivo: **${motivo}**\n\nAutor: **${usuario.tag}**`)
                .setFooter({ text: `Rechazada por ${interaction.user.tag}, Hecha por ${usuario.tag}` })
                .setThumbnail(usuario.displayAvatarURL({ size: 1024, dynamic: true }))
                .setColor(client.color)
                const rowsugsmal = new Discord.MessageActionRow()
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
                sugerencias.edit({ embeds: [embedrechazar], components: [rowsugsmal] })
               

                const obtenerechazo = datasugs.canal

                const embedforthepana = new Discord.MessageEmbed()
                .setTitle("Sugerencia rechazada")
                .setDescription(`La sugerencia ha sido rechazada | [ID DEL MENSAJE](https://discord.com/channels/${interaction.guildId}/${obtenerechazo}/${mensaje})`)
                .setColor(client.color)
                interaction.reply({ embeds: [embedforthepana], ephemeral: true })

                

                usuario.send({ embeds: [new Discord.MessageEmbed().setDescription(`Tu sugerencia en **${interaction.guild.name}** ha sido rechazada | [ID DEL MENSAJE](https://discord.com/channels/${interaction.guildId}/${obtenerechazo}/${mensaje})`).setTitle("Sugerencia rechazada").setColor("RANDOM")] })
              break;
            }

    }
}