const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const client = new Discord.Client({ intents: 32767 })

module.exports = {
    name: "config-ticketsystem",
    description: "Configura el sistema de tickets",
    type: 1,
    options: [
        {
            name: "descripcion",
            description: "La descripcion del embed",
            type: 3,
            required: true
        },
        {
            name: "titulo",
            description: "El titulo del embed",
            type: 3,
            required: true
        },
        {
            name: "imagen",
            description: "La imagen del embed",
            type: "ATTACHMENT"
        },
        {
            name: "oneboton",
            description: "Titulo del primer boton",
            type: 3
        },
        {
            name: "oneemoji",
            description: "Emoji del primer boton",
            type: 3
        },
        {
            name: "twoboton",
            description: "Titulo del segundo boton",
            type: 3
        },
        {
            name: "twoemoji",
            description: "Emoji del segundo boton",
            type: 3
        }
    ],
    perms: "MANAGE_MESSAGES",
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){

       let imagembed = interaction.options.getAttachment("imagen")
       const desc = interaction.options.getString("descripcion")
       let title = interaction.options.getString("titulo")

       

       let embed;

       if(!title){
           title = null;
       }

    
       if(!imagembed){
         embed = new Discord.MessageEmbed()
        .setTitle(`${title}`)
        .setDescription(`${desc}`)
       } else {
         embed = new Discord.MessageEmbed()
        .setTitle(`${title}`)
        .setDescription(`${desc}`)
        .setImage(`${imagembed.proxyURL}`)
       }

       

       


       let row;
       

       let oneboton = interaction.options.getString("oneboton")
       let oneemoji = interaction.options.getString("oneemoji")


       let botoncompuest = new Discord.MessageButton()
       .setLabel(`${oneboton}`)
       .setEmoji(`${oneemoji}`)
       .setStyle("SUCCESS")
       .setCustomId("ticketsone")


       

       let twoboton = interaction.options.getString("twoboton")
       let twoemoji = interaction.options.getString("twoemoji")

       let twocompuest = new Discord.MessageButton()
       .setLabel(`${twoboton}`)
       .setEmoji(`${twoemoji}`)
       .setStyle("SUCCESS")
       .setCustomId("ticketstwo")


       if(!oneboton && oneemoji) return interaction.reply({ content: "Debes poner un titulo para la primera opcion", ephemeral: true })

       if(!oneemoji && oneboton) return interaction.reply({ content: "Debes poner un emoji para la primera opcion", ephemeral: true })

       if(!twoboton && twoemoji) return interaction.reply({ content: "Debes poner un titulo para la segunda opcion", ephemeral: true })

       if(!twoemoji && twoboton) return interaction.reply({ content: "Debes poner un emoji para la segunda opcion", ephemeral: true })
       
       if(oneemoji){
           const verifyone = isEmoji(oneemoji)

           if(verifyone === false){
                return interaction.reply({ content: "La opcion oneemoji debe ser un emoji", ephemeral: true }) 
            } 
       }
       
       if(twoemoji){
           const verifytwo = isEmoji(twoemoji)

           if(verifytwo === false){
               return interaction.reply({ content: "La opcion twoemoji debe ser un emoji", ephemeral: true })
           }
       }

       if(!interaction.channel.permissionsFor(interaction.guild.me).has("SEND_MESSAGES")){
            interaction.reply({ content: "No puedo enviar mensajes en este canal", ephemeral: true })
            return;
       }
       if(!twoboton && !twoemoji){
           row = new Discord.MessageActionRow()
           .addComponents(botoncompuest)
       } else if(oneboton && oneemoji && twoemoji && twoboton){
           row = new Discord.MessageActionRow()
           .addComponents(botoncompuest, twocompuest)
       } else if(twoboton && twoemoji){
           row = new Discord.MessageActionRow()
           .addComponents(twocompuest)
       } 

    

       
       

       interaction.reply({ content: "Mensaje enviado", ephemeral: true })

       
           
           client.channels.cache.get(interaction.channel.id).send({ embeds: [embed], components: [row] })
       

    



       

    }
}

function isEmoji(str) {
    var ranges = [
        '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
    ];
    if (str.match(ranges.join('|'))) {
        return true;
    } else {
        return false;
    }
}