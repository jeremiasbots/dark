const Discord = require('discord.js');
const { readdirSync } = require("fs")

module.exports = {
  name: "help", 
  alias: ["ayuda"], 
  /**
   * 
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */

async execute (client, message, args){

    const categorias = readdirSync('./Commands')
  

    if(args[0]){
      const comando = client.commands.get(args[0].toLowerCase() || c.alias && c.alias.includes(args[0].toLowerCase()));
      const categoria = categorias.find(categoria => categoria.endsWith(args[0].toLowerCase()));
      if(comando){
          let embed = new Discord.MessageEmbed()
              .setTitle(`Comando \`${comando.name}\``)
              .setColor(client.color);
        
          if (comando.description) embed.addField(`Descripción`, `\`\`\`${comando.desc}\`\`\``);
          if (comando.alias && comando.alias.length >= 1) embed.addField(`✅ Alias`, `${comando.alias.map(alias => `\`${alias}\``).join(", ")}`);
          return message.reply({ embeds: [embed] })
      }
    } 

    if(!args[0]){
     

       
       let embedhelp = new Discord.MessageEmbed()
       .setTitle("Help")
       .setColor(client.color)
       .setDescription("Dark hecho por `devep#2622 y su team`")
       .addField("😎 Estadisticas", `**${client.commands.size} Comandos**\n**${client.guilds.cache.size} Servidores**\n**${client.ws.ping} Ping**`)
       .addField("🧐 Servidor de soporte", `**[Servidor de Soporte](https://discord.gg/te63due2Kb)**`)
       .setImage("https://i.imgur.com/N5YfmuO.gif")
       .setThumbnail(message.guild.iconURL({ dynamic: true }))
     

       const menu = new Discord.MessageActionRow()
       .addComponents(
          new Discord.MessageSelectMenu()
          .setCustomId("ayudahelp")
          .setMaxValues(7)
          .setMinValues(1)
          .addOptions(categorias.map(categoria => {
            let object = {
              label: categoria.split(" ")[0],
              value: categoria,
              description: `Comandos de ${categoria.split(" ")[0]}`
            }
            return object;
          }))
       )

       let mensaje = await message.reply({ embeds: [embedhelp], components: [menu] })

       const collector = mensaje.createMessageComponentCollector({ filter: i => i.isButton() || i.isSelectMenu() && i.user && i.message.author.id == client.user.id, time: 180000 });

       collector.on("collect", async (interaction) => {
         let embeds = []
         for (const select of interaction.values){
           const categorycommands = readdirSync(`./Commands/${select}`).filter(archivo => archivo.endsWith("js"))

           let owo = select.split(" ")[1]

           if(!select.split(" ")[1]){
             owo = null
           }
           let embed = new Discord.MessageEmbed()
           .setTitle(`${select.split(" ")[0]}`)
           .setColor(client.color)
           .setThumbnail(message.guild.iconURL({ dynamic: true }))
           .setDescription(categorycommands.length >= 1 ? `>>> *${categorycommands.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `*Todavía no hay comandos en esta categoría...*`)

           if(owo !== null){
            embed = new Discord.MessageEmbed()
           .setTitle(`${select.split(" ")[0]} ${select.split(" ")[1]}`)
           .setColor(client.color)
           .setThumbnail(message.guild.iconURL({ dynamic: true }))
           .setDescription(categorycommands.length >= 1 ? `>>> *${categorycommands.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `*Todavía no hay comandos en esta categoría...*`)
           }
           embeds.push(embed)
         }
         interaction.reply({ embeds, ephemeral: true })
       })
    }



}

}