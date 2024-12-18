const Discord = require ('discord.js');
const economy = require("../../Modelos/userEconomia.js")


module.exports = {
  name: "work", 
  description: "Trabaja y gana dinero",
  type: 1,

async aplication(interaction, client) {

  

  const user = interaction.user


  let random = Math.floor(Math.random() * 575) + 100
  

  let trabajo = ['Policia', 'Bombero', 'Editor', 'Arquitecto', 'Actor']
  let randomtrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]

  

  //work normal

  const data = await economy.findOne({ guildId: interaction.guild.id, userId: interaction.user.id })

   if(!data){
    const xd = new economy({
        guildId: interaction.guild.id,
        userId: interaction.user.id,
        money: 0,
        moneyBank: 0,
        items: []
    })
    xd.save();
  }

  data.money = Math.floor(data.money + random)
  await data.save();

  const embed = new Discord.MessageEmbed()
  .setTitle("Work")
  .setDescription(`**${user.tag}** has trabajado como **${randomtrabajo}** y has conseguido **${random}**`)
  .setColor("GREEN")
  .setFooter({ text: interaction.guild.name })

  interaction.reply({ embeds: [embed] })



 }

}