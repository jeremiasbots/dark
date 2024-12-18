const Discord = require("discord.js")
const Schema = require("../../Modelos/rolesStaffs.js")

module.exports = {
    name: "rolestaffs",
    description: "Añade un rol para poder poner los puntos",
    type: 1,
    options: [
        {
            name: "add",
            description: "Añade un rol para puntos",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "rol",
                    description: "El rol que se añade al miembro",
                    required: true,
                    type: "ROLE"
                }
            ]
        },
        {
            name: "remove",
            description: "Remueve un rol para puntos",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "rol",
                    description: "El roleforever que le quitaras al miembro",
                    required: true,
                    type: "ROLE"
                }
            ]
        },
        {
            name: "list",
            description: "Ve los roles para puntos",
            type: "SUB_COMMAND"
        }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){

        if(interaction.user.id !== interaction.guild.ownerId) return interaction.reply("No puedes usar este comando!")

        switch (interaction.options.getSubcommand()){
            case "add": {
                const role = interaction.options.getRole("rol")

                let data = await Schema.findOne({ guildId: interaction.guild.id })

                if(!data){
                    await Schema.create({ guildId: interaction.guild.id, roles: [] })
                }



                if(data.roles.includes(role.id)){
                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setColor(client.color)
                            .setDescription("Este rol ya esta incluido dentro de los roles de staff")
                        ],
                        ephemeral: true
                    })
                }

                data.roles.push(role.id)
                await data.save()

                interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`✅ <@&${role.id}> ha sido añadido como un role de staff en el servidor`)
                    ]
                })
            }
            break;

            case "remove": {
                const role = interaction.options.getRole("rol")

                const data = await Schema.findOne({ guildId: interaction.guild.id })

                if(!data) return interaction.reply("No hay nadie registrado en el servidor!")

                if(!data.roles.includes(role.id)){
                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setColor(client.color)
                            .setDescription("Este rol no esta incluido dentro de los roles de staff")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                let array = data.roles

                array = array.filter(x => x !== role.id)

                data.roles = array

                await data.save()

                interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`✅ <@&${role.id}> ha sido removido de los roles de staff`)
                    ]
                })
            }

            break;

            case "list": {
            
                let data = await Schema.findOne({ guildId: interaction.guild.id })

                


                if(!data){
                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setColor(client.color)
                            .setDescription("Este servidor no tiene roles de staff")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                let roleGuild = data.roles;

                const mapeado = roleGuild.map((r) => interaction.guild.roles.cache.get(r)).join("\n")

                interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`✅ Los roles de staff de servidor son:\n${mapeado}`)
                    ]
                })
            }

        }

        

       

    }
}