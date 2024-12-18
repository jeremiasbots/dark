const Discord = require("discord.js");
const NSFW = require("ultimate-nsfw");
const nsfw = NSFW.default;

module.exports = {
  name: "pussy", 
  alias:[], 

async execute (client, message, args) {

 if(message.author.bot) return 
    if(!message.channel.nsfw) return message.channel.send(" No puedes utilizar este comando en un chat que no es NSFW")

    const Image = await nsfw.fetch("pussy")
    const embed = new Discord.MessageEmbed()
    .setTitle("Disfrutalo ?")
    .setImage(Image.url)
    .setColor("RANDOM")
    .setFooter(" pajero | NSFW", client.user.displayAvatarURL())
    message.channel.send({ embeds: [embed] })
  }
}