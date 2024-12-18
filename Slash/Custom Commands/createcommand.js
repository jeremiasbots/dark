const { build } = require("../../funciones.js")
const Discord = require("discord.js")
const schema = require("../../Modelos/commandSlash.js")

module.exports = {
    name: "createcustomcommand",
    description: "Crea un comando personalizado en /",
    developer: true,
    options: [
        {
            name: "nombre",
            description: "El nombre del comando",
            type: 3,
            required: true
        },
        {
            name: "descripcion",
            description: "La descripcion del comando",
            type: 3,
            required: true
        },
        {
            name: "respuesta",
            description: "La respuesta al custom command",
            type: 3,
            required: true
        }
    ],
    /**
     * @param {Discord.Interaction} interaction
     * @param {Discord.CLient} client
     */
    async aplication(interaction, client){
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('Tu no puedes crear comandos.');

        const name = interaction.options.getString("nombre"); const response = interaction.options.getString("respuesta")


        const data = await schema.findOne({ Guild: interaction.guild.id, Command: name });
        if(data) return interaction.reply('Este comando ya existe.');
        const newData =  new schema({
            Guild: interaction.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        build(interaction.guild.id, name, interaction.options.getString("descripcion"), client, interaction, response)
        interaction.reply(`Nuevo comando creado, Nombre: **${name}**`);
    }
}