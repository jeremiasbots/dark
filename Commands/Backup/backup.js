const Discord = require('discord.js');
const Premium = require("../../Modelos/UserPremium.js");

module.exports = {
  name: "backup",
  alias: [],
  /**
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {string[]} args
   */

  async execute(client, message, args) {

    

    
  const UserIsPremium = await Premium.findOne({ userId: message.author.id });
  if(!UserIsPremium) {
    return message.reply({ content: "Este comando es de uso `premium`!" });
  }

    const embed = new Discord.MessageEmbed()
    .setTitle("Opciones disponibles")
    .setDescription(`\`{}\` = Argumentos\n\`<>\` = Requerido\nLas opciones con las que contamos actualmente son:\n\n**-** \`$backup-crear\`: Crea un nuevo backup del servidor\n**-** \`$backup-list\`: Te muestra la lista de backups que tienes\n**-** \`$backup-cargar <{backupId}>\`: Carga una backup existente\n**-** \`$backup-info <{backupId}>\`: Te muestra la info de una backup\n**-** \`$backup-delete <{backupId}>\`: Elimina una de tus backups`)
    .setColor("GREEN")
    .setTimestamp()

    message.channel.send({ embeds: [embed]})

    

  }

} 