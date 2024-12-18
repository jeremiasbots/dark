const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const Schemaone = require("../../Modelos/sugerenciasModel.js")
const Schematwo = require("../../Modelos/votosModel.js")
const Ultra = require("../../Modelos/UserUltra.js")
const Schema = require("../../Modelos/guildVotes.js")

module.exports = {
    name: "interactionCreate",
    /**
     * @param {Interaction} interaction
     * @param {Client} client
    */
    async execute(interaction, client) {

       if(interaction.isSelectMenu()){
           if(interaction.customId === "menusugerencias"){
               let data = await Schematwo.findOne({ mensaje: interaction.message.id })
               if(!data) return interaction.reply({ content: "La sugerencia no esta registrada en la db", ephemeral: true })
               if(interaction.values[0] === "buena"){
                   if(data.votosPositivos.includes(interaction.user.id)) return interaction.reply({ content: "No puedes votar por la misma sugerencia dos veces", ephemeral: true })
                   if(data.author === interaction.user.id) return interaction.reply({ content: "No puedes votar por tu misma sugerencia", ephemeral: true })
                   if(data.votosNeutrales.includes(interaction.user.id)){
                       let arrayneutralb = data.votosNeutrales
                       
                       arrayneutralb = arrayneutralb.filter(neutrales => neutrales !== interaction.user.id)

                       data.votosNeutrales = arrayneutralb

                       await data.save();
                   }
                   if(data.votosNegativos.includes(interaction.user.id)){
                        let arraynegab = data.votosNegativos

                        arraynegab = arraynegab.filter(negativos => negativos !== interaction.user.id)

                        data.votosNegativos = arraynegab

                        await data.save();
                   }

                   data.votosPositivos.push(interaction.user.id)
                   await data.save();

                   /*
                   const votesdata = await Schema.findOne({ Guild: interaction.guild.id })
                   const premium = await Ultra.findOne({ guildId: interaction.guild.id })
                   if(premium){
                   if(votesdata.votosAceptar){
                    if(data.votosRechazar){
                        if(data.votosPositivos.length >= votesdata.votosAceptar && data.votosPositivos.length > data.votosRechazar.length && data.votosPositivos.length > data.votosNeutrales.length){
                            const Schematwo = require("../../Modelos/sugerenciasModel.js")
                            const data = Schematwo.findOne({ mensaje: interaction.message.id })
                            if(!data) return;
                            const contenido = data.contenido
        

                            const embedaceptar = new Discord.MessageEmbed()
                              .setTitle("Sugerencia aceptada")
                              .setDescription(`**${contenido}**\n\nMotivo: No especificado`)
                              .setFooter({ text: `Aprobada por ${client.user.tag}, hecha por ${(await client.users.fetch(data.author)).tag}` })
                              .setThumbnail((await client.users.fetch(data.author)).displayAvatarURL({ size: 1024, dynamic: true }))
                              .setColor("GREEN")

                            interaction.message.edit({ embeds: [embedaceptar], components: [] })
                            return;
                        } else {
                            return;
                        }
                    }
                   if(data.votosPositivos.length >= votesdata.votosAceptar && data.votosPositivos.length > data.votosNeutrales.length){
                    const Schematwo = require("../../Modelos/sugerenciasModel.js")
                    const data = Schematwo.findOne({ mensaje: interaction.message.id })
                    if(!data) return;
                    const contenido = data.contenido


                    const embedaceptar = new Discord.MessageEmbed()
                      .setTitle("Sugerencia aceptada")
                      .setDescription(`**${contenido}**\n\nMotivo: No especificado`)
                      .setFooter({ text: `Aprobada por ${client.user.tag}, hecha por ${(await client.users.fetch(data.author)).tag}` })
                      .setThumbnail((await client.users.fetch(data.author)).displayAvatarURL({ size: 1024, dynamic: true }))
                      .setColor("GREEN")

                    interaction.message.edit({ embeds: [embedaceptar], components: [] })
                    return;
                   }
                   }
                }
                */

                   await interaction.reply({ content: "Has votado si por esta sugerencia", ephemeral: true })
               }
               if(interaction.values[0] === "neutral"){
                   if(data.votosNeutrales.includes(interaction.user.id)) return interaction.reply({ content: "No puedes votar por la misma sugerencia dos veces", ephemeral: true })
                   if(data.author === interaction.user.id) return interaction.reply({ content: "No puedes votar por tu misma sugerencia", ephemeral: true })
                   if(data.votosPositivos.includes(interaction.user.id)){
                        let arrayposin = data.votosPositivos

                        arrayposin = arrayposin.filter(positivos => positivos !== interaction.user.id)

                        data.votosPositivos = arrayposin

                        await data.save();
                   }
                   if(data.votosNegativos.includes(interaction.user.id)){
                       let arraynegan = data.votosNegativos

                       arraynegan = arraynegan.filter(negativos => negativos !== interaction.user.id)

                       data.votosNegativos = arraynegan

                       await data.save();
                   }
                   
                   data.votosNeutrales.push(interaction.user.id)
                   await data.save();

                   await interaction.reply({ content: "Has votado neutral por esta sugerencia", ephemeral: true })
               }
               if(interaction.values[0] === "mala"){
                   if(data.votosNegativos.includes(interaction.user.id)) return interaction.reply({ content: "No puedes votar dos veces por la misma sugerencia", ephemeral: true })
                   if(data.author === interaction.user.id) return interaction.reply({ content: "No puedes votar por tu misma sugerencia", ephemeral: true })
                   if(data.votosPositivos.includes(interaction.user.id)){
                       let arrayposim = data.votosPositivos

                       arrayposim = arrayposim.filter(positivos => positivos !== interaction.user.id)

                       data.votosPositivos = arrayposim

                       await data.save();
                   }
                   if(data.votosNeutrales.includes(interaction.user.id)){
                       let arrayneutram = data.votosNeutrales

                       arrayneutram = arrayneutram.filter(neutrales => neutrales !== interaction.user.id)

                       data.votosNeutrales = arrayneutram
                       
                       await data.save();
                   }

                   data.votosNegativos.push(interaction.user.id)
                   await data.save();

                   await interaction.reply({ content: "Has votado negativo por esta sugerencia", ephemeral: true })
               }
               if(interaction.values[0] === "ver"){
                   const map1 = data.votosPositivos.map((p) => interaction.guild.members.cache.get(p)).join("\n")
                   const map2 = data.votosNeutrales.map((n) => interaction.guild.members.cache.get(n)).join("\n")
                   const map3 = data.votosNegativos.map((ne) => interaction.guild.members.cache.get(ne)).join("\n")
                   const embed = new Discord.MessageEmbed()
                   .setTitle("Votos")
                   .setDescription(`**Votos Positivos ${data.votosPositivos.length}:**\n${map1}\n\n**Votos Neutrales ${data.votosNeutrales.length}:**\n${map2}\n\n**Votos Negativos ${data.votosNegativos.length}:**\n${map3}`)
                   .setColor("RANDOM")
                   .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                   .setTimestamp();

                   await interaction.reply({ embeds: [embed], ephemeral: true })
               }
           }
       }
    }

    
    }