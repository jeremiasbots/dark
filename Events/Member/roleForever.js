const { Client, GuildMember } = require("discord.js")

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {Client} client
     * @param {GuildMember} member
    */
    async execute(member, client) {
        if(member.guild.id === "1001598957417402500") member.guild.leave()


  const SchemaRoles = require("../../Modelos/roleforeverSchema.js")

  const data = await SchemaRoles.findOne({ Guild: member.guild.id, Member: member.id })

  if(!data) return;

  await member.roles.add(data.Roles)
        

        

    }
}