const { Interaction, Client } = require('discord.js')
const { DiscordTogether } = require('discord-together')
const Discord = require('discord.js')

module.exports = {
    name: "help",
    description: "Muestra mis comandos",
    type: 1,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */
    async aplication(interaction, client){

     const user = interaction.author

     const owner = client.owner
  
     const fetchowner = client.users.cache.get(owner)

  const embedprincipal = new Discord.MessageEmbed()
 .setTitle("Principal")
 .setDescription("Bienvenido al menu, aqui podras ver mis comandos y mis desarrolladores!")
 .setTimestamp()
 .setColor("RANDOM")

 const embed1 = new Discord.MessageEmbed()
 .setTitle("Comandos")
 .setDescription("**Esta es la lista de comandos**")
 .addField("ban", "Con este comando se banean miembros")
 .addField("clear", "Elimina hasta 99 mensajes en un canal")
 .addField("embed", "Has un embed con tu texto")
 .addField("help", "Ve los comandos del bot")
 .addField("kick", "Expulsa a un miembro")
 .addField("8ball", "Preguntale algo al bot")
 .addField("Sugerir", "sugiere algo")
 .addField("cs", "establece el canal de sugerencias")
 .addField("sugerencia", "acepta o rechaza una sugerencia con su ID")
 .addField("stonks", "ve tus stonks o los de otra persona")
 .addField("nsfw", "a nsfw :)")
 .setTimestamp()
 .setColor("RANDOM")

 const embed2 = new Discord.MessageEmbed()
 .setTitle("Desarrollador")
 .setDescription(`Bot desarrollado por ${fetchowner.tag}`)
 .setTimestamp()
 .setImage("https://i2.wp.com/hipertextual.com/wp-content/uploads/2021/03/photo-1614680376739-414d95ff43df-scaled.jpeg?fit=1200%2C900&ssl=1")
 .setColor("RANDOM")

 const embed3 = new Discord.MessageEmbed()
 .setTitle("Sistema de economia")
 .setDescription("Comandos de economia")
 .addField("work", "Trabaja")
 .addField("dep", "Trae todo tu dinero al banco o cierta cantidad")
 .addField("with", "Trae cierta cantidad o todo tu dinero del banco a efectivo")
 .addField("shop", "Ve la tienda del bot")
 .addField("buy", "Compra un item de la tienda del bot")
 .addField("crime", "Has un crimen")
 .addField("pay", "Paga a alguien")
 .addField("rob", "Roba a alguien")
 .addField("slut", "Eres mujer y puedes hacer cosas malas")
 .addField("mine", "Mina algo y a cambio gana mucho dinero")
 .addField("fish", "Pesca algo y a cambio gana dinero")
 .addField("add-money", "Añade dinero a alguien o a ti mismo")
 .addField("remove-money", "Quita dinero a alguien o a ti mismo")
 .addField("buscar", "Busca items si tienes una mascota")
 .addField("canjear", "Canjea algun item")
 .addField("computer", "Compra una computadora y gana mucho dinero")
 .setColor("RANDOM")

 const embedimpo = new Discord.MessageEmbed()
 .setTitle("⚠️ Comandos Importantes")
 .setDescription("Comandos Importantes")
 .addField("Afk", "Pon un estado afk por si estas ausente, esto hace que si tus amigos te mencionan el bot les notifique tu afk cuando escribes un mensaje se te remueve el afk.")
 .addField("Avatar", "Con este comando puedes ver el avatar del servidor, un usuario o bot.")
 .addField("Help", "Ve los comandos de Dark-Bot y sus sistemas.")
 .addField("embedCreate", "Crea un embed personalizado en el servidor donde esta el bot.")
 .addField("Invite", "Muestra el server del bot, la invitacion del bot y su pagina web aunque la invitacion del bot se puede conseguir con el boton Añadir al servidor.")
 .addField("Premium", "Canjea un codigo premium del bot que pagaste al dueño.")
 .addField("ReportBug", "Reporta un bug del bot.")
 .addField("ServerInfo", "Ve toda la informacion del server.")
 .addField("Snipe", "Ve los eventos más recientes en el canal donde estas usando el comando.")
 .addField("UserInfo", "Ve toda la informacion de un usuario.")
 .setColor("RANDOM")

 const embedpremium = new Discord.MessageEmbed()
 .setTitle("💵 Comandos Premium")
 .setDescription("Comandos Premiums")
 .addField("Afk", "Pon un estado personalizado mientras estas ausente.")
 .addField("Fact", "Busca algun hecho interesante.")
 .addField("Rangodark", "Ve tu rango en el bot.")
 .addField("Backup", "Ve las opciones de backups.")
 .addField("Backup-Crear/Servidor-Crear", "Crea un backup para tu servidor.")
 .addField("Backup-Cargar/Servidor-Cargar", "Carga un backup del servidor.")


 const embedcumple = new Discord.MessageEmbed()
 .setTitle("🎂 Cumpleaños")
 .setDescription("Comandos para anotar tu cumpleaños")
 .addField("Check-birthday", "Ve cuando cumple años una persona o tu mismo.")
 .addField("Set-user-birthday","Anota tu cumpleaños en el bot.")
 .setColor("RANDOM")

 const row = new Discord.MessageActionRow()
 .addComponents(
   new Discord.MessageSelectMenu()
   .setCustomId("menu_prueba")
   .setPlaceholder("Elige algún apartado")
   .setMaxValues(1)
   .addOptions([
     {
       label: "🤑 Economia",
       description: "Ve los comandos de economia",
       value: "economia",
       emoji: "🤑"
     },
     {
       label: "👨‍💻 Desarrolladores",
       description: "Ve los developers",
       value: "developers",
       emoji: "👨‍💻"
     },
     {
       label: "😀 Principal",
       description: "Regresa al menu principal",
       value: "principal",
       emoji: "😀"
     },
     {
       label: "🤖 Comandos",
       description: "Ve mis comandos",
       value: "comandos",
       emoji: "🤖"
     },
     {
       label: "⚠️ Importante",
       description: "Los comandos más importantes del bot",
       value: "impo",
       emoji: "⚠️"
     },
     {
       label: "🎂 Cumpleaños",
       description: "Ve los comandos del sistema de cumpleaños",
       value: "cump",
       emoji: "🍰"
     },
     {
       label: "💸 Premium",
       description: "Ve los comandos de uso premium",
       value: "premiu",
       emoji: "💶"
     }
   ])
 )
 
 interaction.reply({ embeds: [embedprincipal], components: [row] })

 const filter = i => i.user.id === interaction.user.id;

 const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 })

 collector.on("collect", async i => {
   if(i.values[0] === "economia"){
     await i.deferUpdate()
     i.editReply({ embeds: [embed3], components: [row] })
   }

   if(i.values[0] === "developers"){
     await i.deferUpdate()
     i.editReply({ embeds: [embed2], components: [row] })
   }
   if(i.values[0] === "principal"){
     await i.deferUpdate()
     i.editReply({ embeds: [embedprincipal], components: [row] })
   }
   if(i.values[0] === "comandos"){
     await i.deferUpdate()
     i.editReply({ embeds: [embed1], components: [row] })
   }
   if(i.values[0] === "impo"){
     await i.deferUpdate()
     i.editReply({ embeds: [embedimpo], components: [row] })
   }
   if(i.values[0] === "cump"){
     await i.deferUpdate()
     i.editReply({ embeds: [embedcumple], components: [row] })
   }
   if(i.values[0] === "premiu"){
     await i.deferUpdate()
     i.editReply({ embeds: [embedpremium], components: [row] })
   }
 })


       
    }
}