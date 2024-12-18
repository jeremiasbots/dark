const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const db = require('megadb')
const canalconfesiones = new db.crearDB('confesioneschannel')

module.exports = {
    name: "confesion",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Haz una confesion",
    type: 1,
    options: [
        {
            name: "confesion",
            description: "La confesion que vas a hacer (obligatorio)",
            type: 3,
            required: true
        }
    ],

    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){

  if(!canalconfesiones.tiene(interaction.guild.id)) return interaction.reply({ content: "Este servidor no tiene ningun canal de confesiones establecido!", ephemeral: true })

  const conf = interaction.options.getString("confesion")


  const usuario = interaction.user

  interaction.reply({ content: "Tu confesion ha sido mandada al canal de confesiones", ephemeral: true })

  const embed = new Discord.MessageEmbed()
  .setTitle("Confesion anonima")
  .setDescription(conf)
  .setFooter("Confesiones anonimas UWU")
  .setTimestamp()
  .setColor("PURPLE")

  const canal = await canalconfesiones.obtener(interaction.guild.id)
  client.channels.cache.get(canal).send({ embeds: [embed] })

    }
}