const { MessageEmbed } = require("discord.js")
const Schema = require("../../Modelos/itemsSchema.js")
const SchemaUser = require("../../Modelos/userEconomia.js")


module.exports = {
    name: "delete-item",
    description: "Elimina un item",
    type: 1,
    options: [
        {
            name: "item",
            description: "El nombre del item",
            type: 3,
            required: true
        }
    ],
    perms: "ADMINISTRATOR",

    async aplication(interaction, client){

        const nombre = interaction.options.getString("item")

        const data = await Schema.findOne({ guildId: interaction.guild.id })

        if(!data){
            const xd = new Schema({
                guildId: interaction.guild.id,
                items: []
            })
            xd.save();
        }


        const objetos = data.items.map(x => x.name)
        
        if(!objetos.includes(nombre)){
            interaction.reply("Ese objeto no está en la lista de items creados")
            return;
        }

        let array = data.items

                array = array.filter(x => x.name !== nombre)

                data.items = array

                await data.save()

                const mapeo = `${data.items.map(x => `Nombre: ${x.name}  Descripción: ${x.description}\nPrecio:${x.price}`).join("\n\n")}`

        const embed = new MessageEmbed()
        .setTitle("ITEMS")
        .setDescription(mapeo)

       interaction.reply({ embeds: [embed] })

        

    }
}