const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const Schema = require("./../../Modelos/roleforeverSchema.js")

module.exports = {
    name: "roleforever",
    description: "Roles por siempre a un usuario",
    type: 1,
    options: [
        {
            name: "add",
            description: "Añade un rol por siempre",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "miembro",
                    description: "El miembro que le añadiras el rol",
                    required: true,
                    type: "USER"
                },
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
            description: "Remueve un roleforever",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "miembro",
                    description: "El miembro al que le quitaras el rol",
                    required: true,
                    type: "USER"
                },
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
            description: "Ve los rolesforever de un usuario",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "miembro",
                    description: "El miembro del que quieres ver los rolesforever",
                    required: true,
                    type: "USER"
                }
            ]
        }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){

        if(interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: "Solo el owner del servidor puede usar este comando", ephemeral: true })

        

        switch (interaction.options.getSubcommand()){
            case "add": {
                const member = interaction.options.getUser("miembro")
                const role = interaction.options.getRole("rol")

                if(role < interaction.member.roles.highest.position){
                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setColor(client.color)
                            .setDescription("El roleforever que quieres agregar es mayor/igual a tu rol actual")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                let data;

                try {
                    data = await Schema.findOne({ Guild: interaction.guild.id, Member: member.id })

                    if(!data){
                        data = await Schema.create({ Guild: interaction.guild.id, Member: member.id })
                    }
                } catch (err) {
                    console.log(err)
                }


                if(data.Roles.includes(role.id)){
                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setColor(client.color)
                            .setDescription("Este rol ya esta incluido dentro de los rolesforever del usuario")
                        ],
                        ephemeral: true
                    })
                }

                data.Roles.push(role.id)
                await data.save()

                interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`✅ <@&${role.id}> ha sido añadido como un roleforever del usuario`)
                    ]
                })
            }

            break;

            case "remove": {
                const member = interaction.options.getUser("miembro")
                const role = interaction.options.getRole("rol")

                if(role < interaction.member.roles.highest.position){
                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setColor(client.color)
                            .setDescription("El roleforever que quieres remover es mayor/igual a tu rol actual")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                let data = await Schema.findOne({ Guild: interaction.guild.id, Member: member.id })

                if(!data){
                    await Schema.create({ Guild: interaction.guild.id, Member: member.id })
                }


                if(!data.Roles.includes(role.id)){
                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setColor(client.color)
                            .setDescription("Este rol no esta incluido dentro de los rolesforever del usuario")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                let array = data.Roles

                array = array.filter(x => x !== role.id)

                data.Roles = array

                await data.save()

                interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`✅ <@&${role.id}> ha sido removido de los rolesforever del usuario`)
                    ]
                })
            }

            break;

            case "list": {
                const member = interaction.options.getUser("miembro")

                

                let data = await Schema.findOne({ Guild: interaction.guild.id, Member: member.id })

                


                if(!data){
                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setColor(client.color)
                            .setDescription("Este usuario no tiene rolesforever")
                        ],
                        ephemeral: true
                    })
                    return;
                }

                let roleMember = data.Roles;

                const mapeado = roleMember.map((r) => interaction.guild.roles.cache.get(r)).join(", ")

                interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`✅ Los rolesforever que tiene el usuario son ${mapeado}`)
                    ]
                })
            }

            break;
        }

       

    }
}