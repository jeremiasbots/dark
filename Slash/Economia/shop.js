const Discord = require("discord.js")
const Schema = require("../../Modelos/itemsSchema.js")

module.exports = {
    name: "shop",
    description: "Tienda del servidor",
    type: 1,

    async aplication(interaction, client){
        const data = await Schema.findOne({ guildId: interaction.guild.id })

        if(!data){
            const xd = new Schema({
                guildId: interaction.guild.id,
                items: []
            })
            await xd.save();
        }

        let items;

        if(data.items === []){
            items = "Este servidor no tiene items registrados"
        } else if(data.items !== []){
            items = `${data.items.map(x => `Nombre: ${x.name}  Descripción: ${x.description}\nPrecio: ${x.price}`).join("\n\n")}`
        }

        const embed = new Discord.MessageEmbed()
        .setTitle("Items del servidor")
        .setDescription(items)
        .setColor("RANDOM")
        .setFooter({ text: interaction.guild.name })

        interaction.reply({ embeds: [embed] })
    }
}