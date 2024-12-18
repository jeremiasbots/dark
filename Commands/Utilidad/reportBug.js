const Discord = require('discord.js');

module.exports = {
  name: "reportbug",
  alias: ["reportar"],

  async execute (client, message, args){

    const bug = args.join(" ")
    if(!bug) return message.reply({ content: `:x: | \`Debes decir el bug encontrado\``, allowedMentions: { repliedUser: false } })

    if(bug.length < 30){
      return message.reply({ content: "No puedo enviar este reporte, porfavor asegurate de que el contenido sea mayor a 30 caracteres.", allowedMentions: { repliedUser: false } })
    } else {
      const canal = await client.channels.cache.get("960614245882540152")
      canal.send({ content: `Se ha reportado un nuevo bug por: \`${message.author.tag} | ID: ${message.author.id}\`\n**BUG:** \`\`\`${bug}\`\`\``})
      message.reply({ content: "El reporte se ha enviado correctamente", allowedMentions: { repliedUser: false } })
    }
  
  }

}