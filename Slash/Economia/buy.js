const Discord = require("discord.js")
const Schema = require("../../Modelos/userEconomia.js")
const SchemaItems = require("../../Modelos/itemsSchema.js")
const { ephemeralReply } = require("../../funciones.js")

module.exports = {
    name: "buy",
    description: "Compra un objeto",
    type: 1,
    options: [
        {
            name: "item",
            description: "El objeto",
            type: 3,
            required: true
        }
    ],
    /**
     * 
     * @param {Discord.Interaction} interaction 
     * @param {Discord.Client} client 
     * @returns 
     */

    async aplication(interaction, client){
        const item = interaction.options.getString("item")

        const data = await SchemaItems.findOne({ guildId: interaction.guild.id })
        const economydata = await Schema.findOne({ guildId: interaction.guild.id, userId: interaction.user.id })

        if(!economydata){
            const xd = new Schema({
                guildId: interaction.guild.id,
                userId: interaction.user.id,
                money: 0,
                moneyBank: 0,
                items: []
            })
            await xd.save();
        }
        
        if(!data || !data.items){
            interaction.reply({ content: "Este servidor no tiene items", ephemeral: true })
            return;
        }

        const encontrar = data.items.find(x => x.name === item)

        if(encontrar === undefined){
            interaction.reply({ content: "Ese item no existe, utilize </shop:1041800276987883570> para saber los items", ephemeral: true })
            return;
        }

        if(economydata.money < encontrar.price){
            interaction.reply({ content: `Necesitas **${encontrar.price}$** para comprar **${encontrar.name}**`, ephemeral: true })
            return;
        }

        const mapeo = economydata.items.map(x => x.name)

        if(mapeo.includes(encontrar.name)){
            interaction.reply({ content: "No puedes volver a comprar el mismo objeto dos veces", ephemeral: true })
            return;
        }

        if(encontrar.roladd){
            try {
            await interaction.member.roles.add(encontrar.roladd)
            } catch (error) {
                ephemeralReply(interaction, "No se puede añadir ese rol")
                return;
            }
         }

        economydata.money = Math.floor(economydata.money - encontrar.price)
        economydata.items.push(encontrar)
        await economydata.save();

        interaction.reply(`Has comprado ${encontrar.name} por ${encontrar.price}$`)

        


    }
}