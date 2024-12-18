const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const WelcomeChannel = require("../../Modelos/WelcomeChannel");

module.exports = {
  name: "set-welcome-channel",
  alias: [],

  async execute(client, message, args) {

    if (!message.member.permissions.has("MANAGE_GUILD")) {
      return message.reply({ content: `:x: | \`No tienes permisos para ejecutar esta acción\` `, allowedMentions: { repliedUser: false } });
    }

    const channelExist = await WelcomeChannel.findOne({ guildId: message.guild.id })
    const channel = message.mentions.channels.first()

    if(!channelExist){
      if(!channel){
        return message.reply({ content: `:x: | \`Debes mencionar un canal\` `, allowedMentions: { repliedUser: false } }); 
      } else if(!channel.isText()){
        return message.reply({ content: `:x: | \`El canal debe ser un canal de texto\` `, allowedMentions: { repliedUser: false } });
      } else {
        const createChannel = new WelcomeChannel({
          guildId: message.guild.id,
          channelId: channel.id
        });
        await createChannel.save();
        return message.reply({ content: `✅ | \`El canal de bienvenidas fue colocado correctamente a ${channel.name}\``, allowedMentions: { repliedUser: false } });
      }
    } else {
      if(!channel){
        return message.reply({ content: `:x: | \`Debes mencionar un canal\` `, allowedMentions: { repliedUser: false } }); 
      } else if(!channel.isText()){
        return message.reply({ content: `:x: | \`El canal debe ser un canal de texto\` `, allowedMentions: { repliedUser: false } });
      } else {
        channelExist.channelId = channel.id
        await channelExist.save()
        return message.reply({ content: `✅ | \`El canal de bienvenidas fue colocado correctamente a ${channel.name}\``, allowedMentions: { repliedUser: false } });
      }
    }


  }

} 