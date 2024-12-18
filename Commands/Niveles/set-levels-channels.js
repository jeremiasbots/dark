const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const channelSchema = require("../../Modelos/channelLevel");

module.exports = {
  name: "set-levels-channel",
  alias: [],

  async execute(client, message, args) {

    if (!message.member.permissions.has("MANAGE_GUILD")) {
      return message.reply({ content: `:x: | \`No tienes permisos para ejecutar esta acción\` `, allowedMentions: { repliedUser: true } });
    }

    const channelExist = await channelSchema.findOne({ guildId: message.guild.id })
    const channel = message.mentions.channels.first()

    if(!channelExist){
      if(!channel){
        return message.reply({ content: `:x: | \`Debes mencionar un canal\` `, allowedMentions: { repliedUser: true } }); 
      } else if(!channel.isText()){
        return message.reply({ content: `:x: | \`El canal debe ser un canal de texto\` `, allowedMentions: { repliedUser: true } });
      } else {
        const createChannel = new channelSchema({
          guildId: message.guild.id,
          channelId: channel.id
        });
        await createChannel.save();
        return message.reply({ content: `✅ | \`El canal de niveles fue colocado correctamente a ${channel.name}\``, allowedMentions: { repliedUser: true } });
      }
    } else {
      if(!channel){
        return message.reply({ content: `:x: | \`Debes mencionar un canal\` `, allowedMentions: { repliedUser: true } }); 
      } else if(!channel.isText()){
        return message.reply({ content: `:x: | \`El canal debe ser un canal de texto\` `, allowedMentions: { repliedUser: true } });
      } else {
        channelExist.channelId = channel.id
        await channelExist.save()
        return message.reply({ content: `✅ | \`El canal de niveles fue colocado correctamente a ${channel.name}\``, allowedMentions: { repliedUser: true } });
      }
    }


  }

} 