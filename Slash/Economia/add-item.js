const { MessageEmbed, Interaction, Client } = require("discord.js")
const Schema = require("../../Modelos/itemsSchema.js")
const { Item, ephemeralReply } = require("../../funciones.js")

module.exports = {
    name: "add-item",
    description: "Añade un item",
    type: 1,
    options: [
        {
            name: "item",
            description: "Nombre del item que vas a añadir",
            type: 3,
            required: true 
        },
        {
            name: "descripcion",
            description: "La descripcion del item",
            type: 3,
            required: true
        },
        {
            name: "precio",
            description: "El precio del item que vas a añadir",
            type: 4,
            required: true
        },
        {
            name: "rol",
            description: "Rol que se va a añadir",
            type: 8
        }
    ],
    perms: "ADMINISTRATOR",
    /**
     * 
     * @param {Interaction} interaction 
     * @param {Client} client 
     */

    async aplication(interaction, client){

        const nombre = interaction.options.getString("item")
        const descripcion = interaction.options.getString("descripcion")
        const precio = interaction.options.getInteger("precio")
        const rol = await interaction.options.getRole("rol")

        if(rol){
        if(rol.position > interaction.guild.me.roles.highest.position){
            ephemeralReply(interaction, "No puedo añadir ese rol")
            return;
        }
    }

        const data = await Schema.findOne({ guildId: interaction.guild.id })

        if(!data){
            const xd = new Schema({
                guildId: interaction.guild.id,
                items: []
            })
            xd.save();
        }

        if(data.items === []){

            const objeto = new Item(nombre, descripcion, precio)
    
            data.items.push(objeto)
            await data.save();
    
            const mapeo = `${data.items.map(x => `Nombre: ${x.name}  Descripción: ${x.description}\nPrecio: ${x.price}`).join("\n\n")}`
            const embed = new MessageEmbed()
            .setTitle("ITEMS")
            .setDescription(mapeo)
    
            interaction.reply({ embeds: [embed] })
            return;
        }


        const map = data.items.map(x => x.name)

        if(map.includes(nombre)){
            interaction.reply("No puedes crear un objeto con el mismo nombre que otro")
            return;
        }

        const objeto = new Item(nombre, descripcion, precio)

        if(rol){
            objeto['roladd'] = rol.id
        }

        data.items.push(objeto)
        await data.save();

        const mapeo = `${data.items.map(x => `Nombre: ${x.name}  Descripción: ${x.description}\nPrecio: ${x.price}`).join("\n\n")}`
        const embed = new MessageEmbed()
        .setTitle("ITEMS")
        .setDescription(mapeo)

        interaction.reply({ embeds: [embed] })

        

    }
}