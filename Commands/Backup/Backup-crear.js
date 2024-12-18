const { MessageEmbed, MessageActionRow, Message, MessageButton, Client } = require("discord.js");
const GBC = require('../../Modelos/GuildBackupCreate');
const Premium = require("../../Modelos/UserPremium.js");

module.exports = {
  name: "backup-crear",//he eliminado el .env 😈
  alias: ["servidor-crear"],

  async execute(client, message, args) {

    if(message.guild.ownerId !== message.author.id){
      return message.reply({ content: ":x: | `Solo el dueño del servidor puede usar este comando`"})
    }


    
  const UserIsPremium = await Premium.findOne({ userId: message.author.id });
  if(!UserIsPremium) {
    return message.reply({ content: "Este comando es de uso `premium`!" });
  }

    const backups = await GBC.find({ authorId: message.author.id });

    if(backups.length >= 5) {
      return message.reply({ content: `Ya cuentas con \`5\` backups en tu cuenta, ya no es posible crear más.` });
    }

    message.channel.send({ content: "✅ | `Se esta creando la backup, espere un momento`" })
    
    const bck = await backups.create(message.guild, {
      maxMessagesPerChannel: 5
    })

    const cgb = new GBC({
      guildName: message.guild.name,
      guildId: message.guild.id,
      backupId: bck.id,
      authorId: message.author.id
    });
    await cgb.save();

    const Embed = new MessageEmbed()
    .setDescription("¡Backup creada!")
    .addFields(
      { name: "📤 | Cargar Backup", value: `\`\`\`$backup-cargar ${bck.id}\`\`\``}
    )
    .setColor("BLUE")
    .setTimestamp()
    .setFooter({ text: message.guild.name })

    message.channel.send({ embeds: [Embed] });

  }

} 