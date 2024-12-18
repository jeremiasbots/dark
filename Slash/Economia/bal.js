const Discord = require ('discord.js');
const Schema = require("../../Modelos/userEconomia.js")


module.exports = {
  name: "bal", 
  description: "Ve tu dinero y items",
  type: 1,
  options: [
    {
        name: "usuario",
        description: "Usuario del que vas a ver el bal",
        type: "USER"
    }
  ],

async aplication(interaction, client){
  
    const user = interaction.options.getUser("usuario") || interaction.user

  const data = await Schema.findOne({ guildId: interaction.guild.id, userId: user.id })

  if(!data){
    const xd = new Schema({
        guildId: interaction.guild.id,
        userId: user.id,
        money: 0,
        moneyBank: 0,
        items: []
    })
    await xd.save()
  }

  let items;

  if(!data.items || data.items === []){
     items = "No hay items en esa cuenta"
  } else if(data.items && data.items !== []){
    items = data.items.map(x => `Nombre: **${x.name}**`).join("\n")
  }


  const usuarioem = interaction.options.getUser("usuario") || interaction.user


  const embed = new Discord.MessageEmbed()
  .setTitle(`Bal`)
  .setDescription(`Dinero: **${data.money}$** \n\nDinero en el banco: **${data.moneyBank}$**  \n\nTotal: **${Math.floor(data.money + data.moneyBank)}$**\n\n**OBJETOS:**\n${items}`)
  .setColor("RED")
  .setTimestamp()
  .setFooter({ text: "Más actualizaciones proximamente" })
  .setThumbnail(usuarioem.displayAvatarURL({ dynamic: true, size: 1024 }))

  interaction.reply({ embeds: [embed] })

 }

} 