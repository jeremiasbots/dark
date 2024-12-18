const { MessageEmbed, Interaction, Client } = require("discord.js")
const json = require("../../stop.json")

module.exports = {
    name: "stop",
    description: "Haz trampa en el juego de stop",
    type: 1,
    options: [
        {
            name: "letra",
            description: "La letra que vas a poner",
            type: 3,
            required: true
        }
    ],
    premium: true,
    developer: true,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 

    async aplication(interaction, client){
        const letra = interaction.options.getString("letra")

        const nombre = json.letra.nombre
        const apellido = json.letra.apellido
        const pais = json.letra.pais
        const animal = json.letra.animal
        const fruta = json.letra.fruta
        const color = json.letra.color
        const cosa = json.letra.cosa

        const embed = new MessageEmbed()
        .setTitle("Stop")
        .addFields(
            { name: "Nombre", value: nombre },
            { name: "Apellido", value: apellido },
            { name: "País", value: pais },
            { name: "Animal", value: animal },
            { name: "Fruta", value: fruta },
            { name: "Color", value: color },
            { name: "Cosa", value: cosa}
        )
        .setColor("RANDOM")
        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}