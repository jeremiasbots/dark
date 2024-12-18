const { MessageEmbed } = require("discord.js")
const Schema = require("../../Modelos/itemsSchema.js")


module.exports = {
    name: "delete-item",
    alias: [],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */

    async execute(client, message, args){

        if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply("No tienes los permisos para ejecutar este comando")

        const nombre = args[0]

        const data = await Schema.findOne({ guildId: message.guild.id })

        if(!data){
            const xd = new Schema({
                guildId: message.guild.id,
                items: []
            })
            xd.save();
        }


        const objetos = data.items.map(x => x.name)
        
        if(!objetos.includes(nombre)){
            message.reply("Ese objeto no está en la lista de items creados")
            return;
        }

        let array = data.items

                array = array.filter(x => x.name !== nombre)

                data.items = array

                await data.save()

        const mapeo = `${data.items.map(x => `Nombre: ${x.name}  Descripción: ${x.description}\nPrecio:${x.price}\n\n`)}`
        const embed = new MessageEmbed()
        .setTitle("ITEMS")
        .setDescription(mapeo)

        message.reply({ embeds: [embed] })

        

    }
}