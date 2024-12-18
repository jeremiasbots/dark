const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const db = require("megadb")
const channeltransciptions = new db.crearDB("ct")
const ifentred = new db.crearDB("ifentred")
const authorlog = new db.crearDB("authors")
const Developercmd = require('../../Modelos/usersDev.js')
const Ultra = require("../../Modelos/UserUltra.js")
const SchemaRoles = require("../../Modelos/rolesStaffs.js")
const category = new db.crearDB("categorytickets")
const author = new db.crearDB("autorticket")
const Premium = require("../../Modelos/UserPremium.js")
const allowrole = new db.crearDB("roltickets")
const roletickets = new db.crearDB("roltickets")
const { TextInputComponent, Modal, showModal } = require("discord-modals")

module.exports = {
    name: "interactionCreate",
    /**
     * @param {Interaction} interaction
     * @param {Client} client
    */
    async execute(interaction, client) {

        if (interaction.isCommand() || interaction.isContextMenu() || interaction.isMessageContextMenu()) {

            if(interaction.guild){

                const slashcmds = client.slashcommands.get(interaction.commandName)

            if (!slashcmds) return;


            //COOLDOWN
            const { cooldown } = client
  if(!cooldown.has(slashcmds.name)){
    cooldown.set(slashcmds.name, new Discord.Collection())
  }
  const date = Date.now()
  const time = cooldown.get(slashcmds.name);
  const Cooldown = (slashcmds.cooldown || 1) * 1000

  if(time.has(interaction.user.id)){
    const expiracion = time.get(interaction.user.id) + Cooldown;
    if(date < expiracion){
      const restante = (expiracion - date) / 1000
      let s;
      let pap;
      if(restante <= 60){
        pap = restante.toFixed()
        s = "s"
      } else if(restante > 60 && restante <= 3600){
        pap = (restante / 60).toFixed()
        s = "m"
      } else if(restante >= 60 && restante >= 3600){
        pap = (restante / 3600).toFixed()
        s = "h"
      }
  
      return interaction.reply({ content: `Espera! Debes esperar ${pap}${s} para volver a usar este comando`, allowedMentions: { repliedUser: false } })
    }
  }
  time.set(interaction.user.id, date)
  setTimeout(() => {
    time.delete(interaction.user.id)
  }, Cooldown)
//COOLDOWN

            if(slashcmds.developer){
                const devcmd = await Developercmd.findOne({ userId: interaction.user.id })

        if(!devcmd && interaction.user.id !== client.owner){
            interaction.reply({ content: "Este comando es solo para developers o colaboradores", ephemeral: true })
            return; 
         }
            }

            if(slashcmds.beta){
               
                if(interaction.user.id !== "691379190842261515" && interaction.user.id !== "933753161632587906"){
                  interaction.reply("Este comando es solo para beta testers")
                  return;
                }
              }

            if(slashcmds.premium){
                const ifpremium = await Premium.findOne({ userId: interaction.user.id })
                if(!ifpremium){
                    interaction.reply("🤑 No eres usuario premium, no puedes usar este comando.")
                    return;
                 }
            }

            if(slashcmds.prem){
                const ifpremium = await Ultra.findOne({ guildId: interaction.guild.id })
                if(!ifpremium){
                    interaction.reply("🤑 El servidor no es premium, no puedes usar este comando")
                    return;
                }
            }

            if(slashcmds.perms){
                const rolesdata = await SchemaRoles.findOne({ guildId: interaction.guild.id })

        if(rolesdata.roles !== []){
            if(!interaction.member.roles.cache.some(r => rolesdata.roles.includes(r))){
                interaction.reply({ content: "No puedes usar este comando", ephemeral: true })
                return;
            }
        } else if(!rolesdata || rolesdata.roles === [] || !rolesdata.roles){
            var perms = interaction.member.permissions.has(slashcmds.perms)
        if(!perms){
           interaction.reply({ content: `Necesitas el permiso \`${slashcmds.perms}\` para usar este comando`, ephemeral: true })
           return;
        } 
        }
            }

            const Blacklist = require("../../Modelos/Blacklist.js")

            const blacklist = await Blacklist.findOne({ userId: interaction.user.id })
            if(blacklist){
              return interaction.reply({ content: "Estas en la lista negra, no puedes usar los comandos", ephemeral: true }) // ansiedad ver todo junto
            }

            

            try {
                await slashcmds.aplication(interaction, client) // oe pete porque no te fijaste esto
            } catch (e) {
                console.error(e)
                interaction.reply("Hubo un error\n", e)
                client.channels.cache.get("960614245882540152").send({ embeds: [new Discord.MessageEmbed().setTitle("Bug nuevo").setDescription(`Nuevo bug:\n\`${e}\``).addField("Miembro", interaction.user.tag).addField("ID del miembro", `**${interaction.user.id}**`).addField("Guild ID/Name", `**${interaction.guild.name}** | **${interaction.guild.id}**`).setTimestamp().setColor("RANDOM")] })
            }

            return;
                    
            }

            const embednoguild = new Discord.MessageEmbed()
                    .setTitle("Mis comandos no se pueden usar en privado")
                    .setDescription("Hey! ningun comando se puede usar en privado")
                    .setFooter({ text: "No causes bugs" })
                    .setColor("LIGHT_GREY")

                    interaction.reply({ embeds: [embednoguild] })




            /*  

            const canalcmd = await cmdlogs.findOne({ guildId: interaction.guild.id })

            if(!canalcmd) return;

            const embedcmd = new Discord.MessageEmbed()
            .setTitle("**Nuevo comando usado**")
            .setDescription(`El comando **${interaction.commandName}** ha sido usado por **${interaction.user.tag}**`)
            .setFooter({ text: "Dark-Bot uno de los mejores bot de Discord" })
            .setColor("RED")

            client.channels.cache.get(canalcmd.channelId).send({ embeds: [embedcmd] })

            */

        }

        if (interaction.isButton()) {
            if (interaction.customId === "ticketsone") {//Aqui hacemos el anti spam de tickets || ahora weba hacerlo con una db //uta si //, asi que lo haremos con un find o algo parecido
                const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
                const canal = interaction.guild.channels.cache.find(c => c.name === `ticket-${interaction.user.username.toLowerCase()}`)
                if(canal){
                    return interaction.reply({ content: "Usted ya cuenta con un ticket creado...", ephemeral: true }) // ya, guarda para probar 
                }
                const modal = new Discord.Modal()
                .setTitle("Crear ticket")
                .setCustomId("ticketmodal")
               

                const textinput = new Discord.TextInputComponent()
                .setCustomId("descrip")
                .setLabel('Motivo del ticket')
                .setStyle('SHORT')
                .setMinLength(4)
                .setMaxLength(30)
                .setPlaceholder('Escribe aqui')
                .setRequired(true)

                const rowinput = new Discord.MessageActionRow()
                .addComponents(textinput)

                modal.addComponents(rowinput)

                await interaction.showModal(modal)
                
            }

            if (interaction.customId === "ticketstwo") {//Aqui hacemos el anti spam de tickets || ahora weba hacerlo con una db //uta si //, asi que lo haremos con un find o algo parecido
                const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
                const canal = interaction.guild.channels.cache.find(c => c.name === `ticket-${interaction.user.username.toLowerCase()}`)
                if(canal){
                    return interaction.reply({ content: "Usted ya cuenta con un ticket creado...", ephemeral: true }) // ya, guarda para probar 
                }
                const modal = new Discord.Modal()
                .setTitle("Crear ticket")
                .setCustomId("ticketmodal")
               

                const textinput = new Discord.TextInputComponent()
                .setCustomId("descrip")
                .setLabel('Motivo del ticket')
                .setStyle('SHORT')
                .setMinLength(4)
                .setMaxLength(30)
                .setPlaceholder('Escribe aqui')
                .setRequired(true)

                const rowinput = new Discord.MessageActionRow()
                .addComponents(textinput)

                modal.addComponents(rowinput)

                await interaction.showModal(modal)
                
            }

            if (interaction.customId === "ticketstree") {//Aqui hacemos el anti spam de tickets || ahora weba hacerlo con una db //uta si //, asi que lo haremos con un find o algo parecido
                const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
                const canal = interaction.guild.channels.cache.find(c => c.name === `ticket-${interaction.user.username.toLowerCase()}`)
                if(canal){
                    return interaction.reply({ content: "Usted ya cuenta con un ticket creado...", ephemeral: true }) // ya, guarda para probar 
                }
                const modal = new Discord.Modal()
                .setTitle("Crear ticket")
                .setCustomId("ticketmodal")
               

                const textinput = new Discord.TextInputComponent()
                .setCustomId("descrip")
                .setLabel('Motivo del ticket')
                .setStyle('SHORT')
                .setMinLength(4)
                .setMaxLength(30)
                .setPlaceholder('Escribe aqui')
                .setRequired(true)

                const rowinput = new Discord.MessageActionRow()
                .addComponents(textinput)

                modal.addComponents(rowinput)

                await interaction.showModal(modal)
                
            }

            

                    if(interaction.customId === "comprabot"){
                    const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
                    const canal = interaction.guild.channels.cache.find(c => c.name === `bot-${interaction.user.username.toLowerCase()}`)
                    if(canal){
                        return interaction.reply({ content: "Usted ya cuenta con un ticket creado...", ephemeral: true }) // ya, guarda para probar 
                    }
                    const datarole = await roletickets.obtener(interaction.guild.id)
                    if(!datarole) return;
                    let categoryticket = await category.obtener(interaction.guild.id)
                    if(!category.tiene(interaction.guild.id)){
                        categoryticket = null
                    }
                    if(!allowrole.tiene(interaction.guild.id)) return; 
                    const channel = await interaction.guild.channels.create(`bot-${interaction.user.username}`, {
                        type: "GUILD_TEXT",
                        parent: "963236073490771998",
                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                            },
                            {
                                id: everyone.id,
                                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                            },
                            {
                                id: datarole,
                                allow: ["VIEW_CHANNEL"],
                                deny: ["SEND_MESSAGES", "MANAGE_CHANNELS", "MANAGE_WEBHOOKS"]
                            }
                        ]
                    })
                        const mensaje = new Discord.MessageEmbed()
                            .setTitle(`Bienvenido a tu ticket, ${interaction.user.username}`)
                            .setDescription("Este es un ticket para resolver dudas y/o preguntas por favor espera pacientemente a un admin")
                            .setColor("RANDOM")
    
                        const row = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                            .setCustomId("elim")
                            .setStyle("SECONDARY")
                            .setLabel("Eliminar")
                            .setEmoji("🗑️"),
                            new Discord.MessageButton()
                            .setCustomId("transc")
                            .setStyle("PRIMARY")
                            .setLabel("Transcribir")
                            .setEmoji("👻"),
                            new Discord.MessageButton()
                            .setCustomId("enc")
                            .setStyle("SECONDARY")
                            .setLabel("Entrar en el ticket")
                            .setEmoji("👮‍♂️")
                        )

                        const maprole = dataroles.Roles.map((r) => interaction.guild.roles.cache.get(r)).join(", ")
    
                        channel.send({ content: `<@&${maprole}>`, embeds: [mensaje], components: [row] }).then(m => {
                            m.pin()
                        })
    
                        authorlog.establecer(interaction.channel.id, interaction.user.id)
                    
                    interaction.reply({ content: `<@${interaction.user.id}>, tu Ticket ha sido creado correctamente en ${channel}`, ephemeral: true })
                        }
            if(interaction.customId === "elim"){
                if(!interaction.member.permissions.has("MANAGE_CHANNELS")){
                    interaction.reply({ content: "No tienes los permisos para eliminar el ticket", ephemeral: true })
                    return;
                }

                const html = require("discord-html-transcripts")

                const adjunto = await html.createTranscript(interaction.channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${interaction.channel.name}.html`
                })

                const authorticket = await authorlog.obtener(interaction.channel.id)

                if(interaction.user.id === authorticket){
                    interaction.reply({ content: "Hey! no puedes eliminar el ticket", ephemeral: true })
                    return;
                }

                
                
                if(channeltransciptions.tiene(interaction.guild.id)){
                    const modal = new Discord.Modal()
                    .setCustomId("eliminarticket")
                    .setTitle("Razón para eliminar")

                    const razon = new Discord.TextInputComponent()
                    .setCustomId("razonelimina")
                    .setLabel('Razón para eliminar el ticket')
                    .setStyle('SHORT')
                    .setMinLength(7)
                    .setMaxLength(100)
                    .setPlaceholder('Escribe aqui la razón')
                    .setRequired(true)

                    const row = new Discord.MessageActionRow()
                    .addComponents(razon)

                    modal.addComponents(row)

                    await interaction.showModal(modal)
                    return;
                }
               

                if(ifentred.tiene(`${interaction.channel.id}`)){
                    ifentred.eliminar(`${interaction.channel.id}`)
                }

                if(authorlog.tiene(interaction.channel.id)){
                    authorlog.eliminar(interaction.channel.id)
                }




                interaction.reply({ content: "El ticket sera eliminado ...", ephemeral: true }).then(msg => {
                    setTimeout(() => {
                        interaction.channel.delete()
                    }, 3000)
                })

            
            }

            if(interaction.customId === "transc"){
                const html = require("discord-html-transcripts")

                const adjunto = await html.createTranscript(interaction.channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${interaction.channel.name}.html`
                })

                const embedstrans = new Discord.MessageEmbed()
                .setTitle("**Nueva transcripcion!**")
                .setDescription(`${interaction.user.tag} **ha pedido una transcripcion para** ${interaction.channel}`)
                .setColor("NAVY")
                .setFooter({ text: "Tickets by Dark-Bot 😎"})
                .setTimestamp()

                const authortransc = await author.obtener(interaction.channel.id)

                if(interaction.user.id === authortransc){
                    interaction.reply({ content: "Hey! no puedes pedir transcripciones eres el autor", ephemeral: true })
                    return;
                }


                if(!channeltransciptions.tiene(interaction.guild.id)){
                interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [embedstrans], files: [adjunto] })
                return;
                }

                let canaltrans = await channeltransciptions.obtener(interaction.guild.id)

                client.channels.cache.get(canaltrans).send({ content: `<@${interaction.user.id}>`, embeds: [embedstrans], files: [adjunto] })
            }

            if(interaction.customId === "enc"){
                const embedenc = new Discord.MessageEmbed()
                .setTitle("**Alguien ha ingresado al ticket**")
                .setDescription(`El staff <@${interaction.user.id}> ha ingresado al ticket\n para responder su consulta`)
                .setColor("BLUE")
                .setThumbnail(interaction.user.displayAvatarURL({ size: 1024, dynamic: true }))
                .setTimestamp()

                if(interaction.member.permissions.has("ADMINISTRATOR")){
                    interaction.reply({ content: "No puedes entrar al ticket porque ya tienes los permisos", ephemeral: true })
                    return;
                }

                const authorenc = await author.obtener(interaction.channel.id)
                const allowedrole = await roletickets.obtener(interaction.guild.id)

                if(!interaction.member.roles.cache.has(allowedrole)){
                    interaction.reply({ content: "No eres staff", ephemeral: true })
                    return;
                }

                if(interaction.user.id === authorenc){
                    interaction.reply({ content: "Hey! tu eres el autor no puedes entrar", ephemeral: true })
                    return;
                }

                if(!ifentred.tiene(`${interaction.channel.id}.${interaction.user.id}`)){
                    ifentred.establecer(`${interaction.channel.id}.${interaction.user.id}`, 0)
                }


                const entred = await ifentred.obtener(`${interaction.channel.id}.${interaction.user.id}`)

                if(entred ==  1){
                    interaction.reply({ content: "Ya has entrado al ticket no puedes entrar otra vez.", ephemeral: true })
                    return;
                }

                ifentred.sumar(`${interaction.channel.id}.${interaction.user.id}`, 1)

                interaction.reply({ embeds: [embedenc] })


                interaction.channel.permissionOverwrites.edit(interaction.user, { SEND_MESSAGES: true })
            }

            if(interaction.customId == "guild"){
                let modalg = new Modal()
                .setCustomId("modalguild")
                .setTitle("Verificate")
                .addComponents(
                    [
                        new TextInputComponent()
                        .setCustomId("capt")
                        .setLabel("Captcha")
                        .setStyle("SHORT")
                        .setMinLength(2)
                        .setMaxLength(9)
                        .setPlaceholder("Escribe aqui el texto del captcha")
                        .setRequired(true)
                    ]
                )

                showModal(modalg, {
                    client: client,
                    interaction: interaction
                })

            }

            if(interaction.customId === "finenet"){
                
                const modalstaff = new Discord.Modal()
        .setTitle("Formulario para entrar a la Network")
        .setCustomId("netform")

        const namestaff = new Discord.TextInputComponent()
        .setCustomId("one")
        .setLabel("¿Cuál es la id del bot?")
        .setPlaceholder("ID DEL BOT")
        .setMinLength(1)
        .setMaxLength(75)
        .setStyle("SHORT")
        .setRequired(true)

        const two = new Discord.TextInputComponent()
        .setCustomId("two")
        .setLabel("¿Cuál es la ID del owner?")
        .setPlaceholder("ID DEL OWNER")
        .setMinLength(1)
        .setMaxLength(30)
        .setStyle("SHORT")
        .setRequired(true)

        const tree = new Discord.TextInputComponent()
        .setCustomId("tree")
        .setLabel("¿Porque quieres meter al bot?")
        .setPlaceholder("Razon para meterlo")
        .setMinLength(1)
        .setMaxLength(100)
        .setStyle("SHORT")
        .setRequired(true)

        const four = new Discord.TextInputComponent()
        .setCustomId("four")
        .setLabel("¿Aceptas los terminos de servicio?")
        .setPlaceholder("Si o no")
        .setMinLength(1)
        .setMaxLength(30)
        .setStyle("SHORT")
        .setRequired(true)

        const five = new Discord.TextInputComponent()
        .setCustomId("five")
        .setLabel("¿Aceptas la politica de privacidad?")
        .setPlaceholder("Si o no")
        .setMinLength(1)
        .setMaxLength(30)
        .setStyle("SHORT")
        .setRequired(true)
        

        const row = new Discord.MessageActionRow()
        .addComponents(namestaff)

        const row1 = new Discord.MessageActionRow()
        .addComponents(two)

        const row2 = new Discord.MessageActionRow()
        .addComponents(tree)

        const row3 = new Discord.MessageActionRow()
        .addComponents(four)

        const row4 = new Discord.MessageActionRow()
        .addComponents(five)

        modalstaff.addComponents(row, row1, row2, row3, row4)

        await interaction.showModal(modalstaff)
        
         }


            

        }

        if(interaction.isModalSubmit()){
            if(interaction.customId === "ticketmodal"){
                const motivodelticket = interaction.fields.getTextInputValue('descrip')
            //aqui we
                const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
            
                const datarole = await roletickets.obtener(interaction.guild.id)
                if(!datarole) return;

                const allowedrole = await allowrole.obtener(interaction.guild.id)
                if(!allowrole.tiene(interaction.guild.id)) return;
               
                            let categoryticket = await category.obtener(interaction.guild.id)
                            if(!category.tiene(interaction.guild.id)){
                                categoryticket = null
                            }
                            
            
                            const channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, { // pues es sacar la id de este canal
                                type: "GUILD_TEXT",
                                parent: categoryticket,
                                permissionOverwrites: [
                                    {
                                        id: interaction.user.id,
                                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                                    },
                                    {
                                        id: everyone.id,
                                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                                    },
                                    {
                                        id: allowedrole,
                                        allow: ["VIEW_CHANNEL"],
                                        deny: ["SEND_MESSAGES", "MANAGE_CHANNELS", "MANAGE_WEBHOOKS"]
                                    }
                                ]
                            })

                            

                            
                                const mensaje = new Discord.MessageEmbed()
                                    .setTitle(`Bienvenido a tu ticket, ${interaction.user.username}`)
                                    .setDescription(`Este es un ticket para ${motivodelticket} por favor espera pacientemente a un admin`)
                                    .setColor("RANDOM")
            
                                const row = new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageButton()
                                    .setCustomId("elim")
                                    .setStyle("SECONDARY")
                                    .setLabel("Eliminar")
                                    .setEmoji("🗑️"),
                                    new Discord.MessageButton()
                                    .setCustomId("transc")
                                    .setStyle("PRIMARY")
                                    .setLabel("Transcribir")
                                    .setEmoji("👻"),
                                    new Discord.MessageButton()
                                    .setCustomId("enc")
                                    .setStyle("SECONDARY")
                                    .setLabel("Entrar en el ticket")
                                    .setEmoji("👮‍♂️")
                                )

                                
            
                                channel.send({ content: `<@&${datarole}>`, embeds: [mensaje], components: [row] }).then(m => {
                                    m.pin()
                                })
            
                                authorlog.establecer(interaction.channel.id, interaction.user.id)
                            
                            
                              interaction.reply({ content: `<@${interaction.user.id}>, tu Ticket ha sido creado correctamente en ${channel}`, ephemeral: true }) //pues ${channel} es el canal, hay que sacar la id de eso para poder eliminar el canal XD
                            
              }

              

              if(interaction.customId === 'netform'){
                  
                  const one = interaction.fields.getTextInputValue('one')
                  const two = interaction.fields.getTextInputValue('two')
                  const tree = interaction.fields.getTextInputValue('tree')
                  const four = interaction.fields.getTextInputValue('four')
                  const five = interaction.fields.getTextInputValue('five')



                  let embedapplication = new Discord.MessageEmbed()
                  .setTitle("Formulario para ser parte de la net")
                  .addField("¿Cuál es la ID del bot?", `${one}`)
                  .addField("¿Cuál es la ID del owner?", `${two}`)
                  .addField("¿Porque quieres meter al bot?", `${tree}`)
                  .addField("¿Aceptas los terminos de servicio?", `${four}`)
                  .addField("¿Aceptas la politica de privacidad?", `${five}`)
                  .setThumbnail(client.users.cache.get(one).displayAvatarURL({ size: 1024, dynamic: true }))
                  .setFooter({ text: `Enviado por ${client.users.cache.get(interaction.user.id).tag}`})

                  

                  client.users.cache.get("691379190842261515").send({ embeds: [embedapplication] })

                  interaction.reply({ content: "Has enviado tu aplicacion correctamente!", ephemeral: true })
                  

                

                
              }

              if(interaction.customId === "eliminarticket"){
                  if(!channeltransciptions.tiene(interaction.guild.id)){
                      return;
                  }

                  const captar = await channeltransciptions.obtener(interaction.guild.id)

                  const field = interaction.fields.getTextInputValue('razonelimina')

                  const embed = new Discord.MessageEmbed()
                  .setTitle("Ticket Eliminado")
                  .setDescription(`${interaction.channel.name} ha sido eliminado por <@${interaction.user.id}> con la razón *${field}*`)
                  .setColor("GREEN")
                  .setThumbnail(interaction.user.displayAvatarURL({ size: 1024, dynamic: true }))

                  const html = require("discord-html-transcripts")

                const adjunto = await html.createTranscript(interaction.channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${interaction.channel.name}.html`
                })

                if(ifentred.tiene(`${interaction.channel.id}`)){
                    ifentred.eliminar(`${interaction.channel.id}`)
                }

                if(authorlog.tiene(interaction.channel.id)){
                    authorlog.eliminar(interaction.channel.id)
                }

                

                 client.channels.cache.get(captar).send({ embeds: [embed], files: [adjunto] })

                interaction.reply('El ticket sera eliminado').then((msg) => {
                    setTimeout(() => {
                        interaction.channel.delete()
                    }, 3000)
                })
              }

              
            
        }

        if(interaction.isSelectMenu()){
            if(interaction.customId === "menu_prueba"){
                if(interaction.values[0] === "sup"){
                    const embedsup = new Discord.MessageEmbed()
                    .setTitle("Cuando se abren postulaciones a staff?")
                    .setDescription("`Actualmente las postulaciones a staff estan cerradas pero proximamente se abriran`")
                    .setColor("#ff0000")
                    .setFooter({ text: "Dark-Bot tickets" })

                    interaction.reply({ embeds: [embedsup], ephemeral: true })
                }
                if(interaction.values[0] === "team"){
                    const embedteam = new Discord.MessageEmbed()
                    .setTitle("Que es JereDev Team?")
                    .setDescription("`JereDev Team es el team de developers de el owner: JeremiasBots#3355, es el encargado del desarrollo de Dark-Bot y Class-Bot`")
                    .setColor("DARK_NAVY")
                    .setFooter({ text: "Dark-Bot tickets" })

                    interaction.reply({ embeds: [embedteam], ephemeral: true })
                }
                if(interaction.values[0] === "boost"){
                    const embedmejora = new Discord.MessageEmbed()
                    .setTitle("Mis recompensas por mejorar")
                    .setDescription("Level 1:\n🥵 Ayuda antes que los miembros normales\n😈 Acceso a más canales nsfw xd\n✞ Participar más en proyectos\n\nLevel 2:\n😈 Las ventajas del Level 1\n🤑 Premium de 1 mes que es lo que duran las mejoras\n💻 Clases de discord.js con <@711401170429804624> y yo.\n👦 Codes Exclusivos\n♦️ Acceso a funciones beta\n\n**Si mejoras el servidor 1 vez te llevas un Dark-Bot gratis o Class-Bot gratis y si son 2 te llevas un Custom bot gratis**")
                    .setColor("DARK_GREY")
                    .setFooter({ text: "Dark-Bot tickets" })

                    interaction.reply({ embeds: [embedmejora], ephemeral: true })
                }
            }
        }
    }

        

    }