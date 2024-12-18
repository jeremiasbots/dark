const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: "embed",
    description: "Crea un embed",
    type: 1,
    options: [
        {
            name: "titulo",
            description: "El titulo del embed",
            type: 3,
            required: true
        },
        {
            name: "descripcion",
            description: "La descripcion del embed (requerido)",
            type: 3,
            required: true
        },
        {
            name: "footer",
            description: "El footer del embed",
            type: 3
        },
        {
            name: "color",
            description: "El color del embed (requerido)",
            type: 3,
            choices: [
                {
                    name: "Rojo",
                    value: "rojo"
                },
                {
                    name: "Naranja",
                    value: "naranja"
                },
                {
                    name: "Azul",
                    value: "azul"
                },
                {
                    name: "Morado",
                    value: "morado"
                },
                {
                    name: "Dorado",
                    value: "dorado"
                },
                {
                    name: "Verde",
                    value: "verde"
                },
                {
                    name: "Amarillo",
                    value: "amarillo"
                },
                {
                    name: "Fucsia",
                    value: "fucsia"
                },
                {
                    name: "Rojo Oscuro",
                    value: "redark"
                },
                {
                    name: "Gris",
                    value: "gris"
                },
                {
                    name: "Aqua",
                    value: "agua"
                },
                {
                    name: "Verde Oscuro",
                    value: "gredark"
                },
                {
                    name: "Naranja Oscuro",
                    value: "narandark"
                },
                {
                    name: "Gris Claro",
                    value: "greylight"
                }
            ]
        },
        {
            name: "thumbnail",
            description: "Imagen pequeña",
            type: 3
        }
    ],
    perms: "MANAGE_MESSAGES",
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){


        const colores = interaction.options.getString("color") || "nh"
        let color;

        switch(colores) {
            case "rojo":
                color = "RED"
              break;
            case "naranja":
                color = "ORANGE"
              break;
            case "azul":
                color = "BLUE"
            break;
            case "morado":
                color = "PURPLE"
            break;
            case "dorado":
                color = "GOLD"
            break;
            case "verde":
                color = "GREEN"
            break;
            case "amarillo":
                color = "YELLOW"
            break;
            case "fucsia":
                color = "FUCHSIA"
            break;
            case "redark":
                color = "DARK_RED"
            break;
            case "gris":
                color = "GREY"
            break;
            case "agua":
                color = "AQUA"
            break;
            case "gredark":
                color = "DARK_GREEN"
            break;
            case "narandark":
                color = "DARK_ORANGE"
            break;
            case "greylight":
                color = "LIGHT_GREY"
            break;
            case "nh": 
                color = "nh"
            break;
        }


       const embed = new Discord.MessageEmbed()
       .setTitle(`${interaction.options.getString("titulo")}`)
       .setDescription(`${interaction.options.getString("descripcion")}`)

       if(color !== "nh"){
            embed.setColor(color)
       } 

       if(interaction.options.getString("footer")){
           embed.setFooter({ text: interaction.options.getString("footer") })
       }

      

       interaction.reply({ content: "Tu embed ha sido enviado", ephemeral: true })

       interaction.channel.send({ embeds: [embed] })


    }
}