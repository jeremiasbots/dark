const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: "8ball",
    description: "Preguntame algo",
    type: 1,
    options: [
        {
            name: "pregunta",
            description: "La pregunta que le haras al bot (obligatorio)",
            type: 3,
            required: true
        }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){
        const pregunta = await interaction.options.getString("pregunta")
        if(!pregunta) return interaction.reply({ content: "Debes escribir una pregunta.", ephemeral: true })
        if(pregunta.startsWith("http")){
            interaction.reply({ content: "No puedes preguntar links", ephemeral: true })
            return;
        }
        let respuestas = ["Si.", "No", "Posiblemente", "Eso es imposible","Pregunta otra cosa, eso es dificil","Pregunta más tarde, estoy teniendo un error","Probablemente si","Probablemente no"]
        let random = respuestas[Math.floor(Math.random() * respuestas.length)];
        const embed = new Discord.MessageEmbed()
        .setTitle("8ball")
        .setDescription(`A tu pregunta:\n**${pregunta}**\n\nMi respuesta es:\n**${random}**`)
        interaction.reply({ embeds: [embed] })
    }
}