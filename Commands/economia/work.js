const Discord = require ('discord.js');
const economy = require("../../Modelos/userEconomia.js")


module.exports = {
  name: "work", 
  alias: ["w"], 
  developer: false,
  premium: false,
  cooldown: 120000,

async execute (client, message, args) {

  

  const user = message.author;


  let random = Math.floor(Math.random() * 575) + 100
  

  let trabajo = ['Policia', 'Bombero', 'Editor', 'Arquitecto', 'Actor']
  let randomtrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]

  

  //work normal

  const data = await economy.findOne({ guildId: message.guild.id, userId: message.author.id })

   if(!data){
    await economy.create({ guildId: message.guild.id, userId: message.author.id, money: 0, moneyBank: 0, items: [] })
  }

  data.money = Math.floor(data.money + random)
  await data.save();

  const embed = new Discord.MessageEmbed()
  .setTitle("TRABAJO")
  .setDescription(`**${user.tag}** has trabajado como **${randomtrabajo}** y has conseguido **${random}**`)
  .setColor("GREEN")

  message.reply({ embeds: [embed] })



 }

}