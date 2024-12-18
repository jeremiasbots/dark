const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')

module.exports = {
  name: "ppt", 
  alias: [], 

execute (client, message, args){

  const userblack = message.author;

  if(blacklist.has(`${userblack.id}`)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  const opcion = args[0]
  if(!opcion) return message.channel.send("Di una opcion (piedra, papel o tijera)")

  let opcionesbot = ['piedra', 'papel', 'tijera']
  let opcionbot = opcionesbot[Math.floor(Math.random() * opcionesbot.length)]

  if(opcion === 'tijera'){

    if(opcionbot === 'tijera'){

      const embed = new Discord.MessageEmbed()
      
      .setTitle("Empate!")
      .setDescription(`El bot ha escogido la opcion **${opcionbot}** y tu ${opcion}`)
      .setColor("RANDOM")
      .setImage("https://media.discordapp.net/attachments/906567546717732875/912172397933768714/1_yHZKuUPofUf39CpZ6frmxw.png?width=1025&height=416")

      return message.channel.send({ embeds: [embed] })
    }

  }

    if(opcion === 'piedra'){

    if(opcionbot === 'tijera'){

      const embed = new Discord.MessageEmbed()
      
      .setTitle("Ganaste!")
      .setDescription(`El bot ha escogido la opcion **${opcionbot}** y tu ${opcion}`)
      .setColor("RANDOM")
      .setImage("https://media.discordapp.net/attachments/906567546717732875/912172397933768714/1_yHZKuUPofUf39CpZ6frmxw.png?width=1025&height=416")

      return message.channel.send({ embeds: [embed] })
    }

    }

    if(opcion === 'papel'){

    if(opcionbot === 'tijera'){

      const embed = new Discord.MessageEmbed()
      
      .setTitle("Perdiste!")
      .setDescription(`El bot ha escogido la opcion **${opcionbot}** y tu ${opcion}`)
      .setColor("RANDOM")
      .setImage("https://media.discordapp.net/attachments/906567546717732875/912172397933768714/1_yHZKuUPofUf39CpZ6frmxw.png?width=1025&height=416")

      return message.channel.send({ embeds: [embed] })
    }

  }

      if(opcion === 'piedra'){

    if(opcionbot === 'papel'){

      const embed = new Discord.MessageEmbed()
      
      .setTitle("Perdiste!")
      .setDescription(`El bot ha escogido la opcion **${opcionbot}** y tu ${opcion}`)
      .setColor("RANDOM")
      .setImage("https://media.discordapp.net/attachments/906567546717732875/912172397933768714/1_yHZKuUPofUf39CpZ6frmxw.png?width=1025&height=416")

      return message.channel.send({ embeds: [embed] })
    }

  }

      if(opcion === 'papel'){

    if(opcionbot === 'piedra'){

      const embed = new Discord.MessageEmbed()
      
      .setTitle("Ganaste!")
      .setDescription(`El bot ha escogido la opcion **${opcionbot}** y tu ${opcion}`)
      .setColor("RANDOM")
      .setImage("https://media.discordapp.net/attachments/906567546717732875/912172397933768714/1_yHZKuUPofUf39CpZ6frmxw.png?width=1025&height=416")

      return message.channel.send({ embeds: [embed] })
    }

  }

 }

} 