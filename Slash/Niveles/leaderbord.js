const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const levels = require("../../Modelos/levelsSchema")

module.exports = {
    name: "leaderbord",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Mira la tabla de posiciones de los usuarios más activos del servidor",
    type: 1,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){

        await interaction.deferReply();

        let dataGlobal = await levels.find({ guildId: interaction.guild.id }).sort([["xp", "descending"]]).exec()

        dataGlobal = dataGlobal.slice(0, 10)
        if(!dataGlobal){
            interaction.reply({ content: "Nadie de este servidor tiene un progreso registrado", ephemeral: true })
            return;
        }

        const puestoUsuario = dataGlobal.findIndex(dataUser => dataUser.userId === interaction.user.id) + 1
 

        const embed = new Discord.MessageEmbed()
        .setTitle("Leaderbord")
        .setThumbnail(interaction.guild.iconURL())
        .setDescription(`${dataGlobal.map((data, index) => `${index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉": index + 1}. **${client.users.cache.get(data.userId).tag}** - \`${data.xp} XP\``).join("\n")}`)
        .setColor("GREEN")
        .setFooter({ text: `Te encuentras en el puesto ${puestoUsuario}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setTimestamp();

        interaction.followUp({ embeds: [embed] })



    }
}