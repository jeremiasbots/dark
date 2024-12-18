const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const { random } = require('lodash')

module.exports = {
    name: "kill",
    description: "Mata a un usuario",
    type: 1,
    options: [
        {
            name: "usuario",
            description: "El usuario que vas a matar (obligatorio)",
            type: 6,
            required: true
        }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){

        const usuario = interaction.options.getUser("usuario")
        const autor = interaction.user.tag
        if(usuario.id === interaction.member.id){
            interaction.reply({ content: "No te puedes matar a ti mismo", ephemeral: true })
            return;
        }

        const randomimage = ["https://i.imgur.com/rfuJAwV.png", "https://i.gifer.com/WxLR.gif", "https://c.tenor.com/6VM7lzsBSuUAAAAC/id-invaded-gun.gif", "https://i.pinimg.com/originals/7a/0f/04/7a0f049b2d2d0968c265cf18d28f0f45.gif", "https://pa1.narvii.com/6144/97532ccd9e648f6bcb33a26911c3bbbcdfbd544a_hq.gif"]

        const random = randomimage[Math.floor(Math.random() * randomimage.length)]
        
      
        const embed = new Discord.MessageEmbed()
        .setTitle("Matar")
        .setDescription(`${autor} mato a ${usuario}`)
        .setImage(random)
        .setColor("RANDOM")
      
        interaction.reply({ embeds: [embed] })
      

    }
}
      
