const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const { Client, MessageEmbed, Message } = require('discord.js')
const { getAudioUrl } = require("google-tts-api")
const { joinVoiceChannel } = require("@discordjs/voice")


module.exports = {
  name: "tts", 
  alias: ["textvoice"], 
  developer: false,
  premium: false,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {string[]} args
   */

  async execute (client, message, args){

    if(!args[0]) return message.reply("Escribe un texto!")

    const string = args.join(' ');

    if(string > 200) return message.reply("El texto tiene que ser menor a 200 caracteres")


    const voiceChannel = message.member.voice.channel
    if(!voiceChannel) return message.reply("Debes conectarte a un canal de voz")

    const audioURL = await getAudioUrl(string, {
        lang: 'es',
        slow: false,
        host: 'https://translate.google.com',
        timeout: 10000
    });

    try {
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guildId,
            adapterCreator: message.guild.voiceAdapterCreator
        })

        connection.play(audioURL)
    } catch (e) {
        message.reply("Ha habido un error")
        console.error(e)
    }

    
  }

} 