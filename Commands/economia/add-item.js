const { MessageEmbed } = require("discord.js")
const Schema = require("../../Modelos/itemsSchema.js")


module.exports = {
    name: "add-item",
    alias: [],
    developer: true,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */

    async execute(client, message, args){

        if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply("No tienes los permisos para ejecutar este comando")

        const nombre = args[0]
        const precio = args[1]
        const descripcion = args[2]

        const data = await Schema.findOne({ guildId: message.guild.id })

        if(!data){
            const xd = new Schema({
                guildId: message.guild.id,
                items: []
            })
            xd.save();
        }

        const objeto = {
            name: nombre,
            description: descripcion,
            price: precio
        }

        data.items.push(objeto)
        await data.save();

        const mapeo = `${data.items.map(x => `Nombre: ${x.name}  Descripción: ${x.description}\nPrecio:${x.price}\n\n`)}`
        const embed = new MessageEmbed()
        .setTitle("ITEMS")
        .setDescription(mapeo)

        message.reply({ embeds: [embed] })

        

    }
}