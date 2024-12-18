const { Client, Role } = require("discord.js")
const Schema = require("../../Modelos/rolesStaffs.js")

module.exports = {
    name: "roleDelete",
    /**
     * @param {Client} client
     * @param {Role} role
     */

    async execute(role, client){
        const data = await Schema.findOne({ guildId: role.guild.id })

        if(!data || !data.roles.includes(role.id)) return;

        let array = data.roles

        array = array.filter(x => x !== role.id)

        data.roles = array

        await data.save()
    }
}