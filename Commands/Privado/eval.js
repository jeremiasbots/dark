const { Client, Message, MessageEmbed } = require('discord.js')
const { inspect } = require('util')

module.exports = {
    name: "eval",
    alias: [],
    developer: true,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */

    execute(client, message, args) {

        const comando = args.join(" ")

        const arrayprohibido = ["process.cwd()", "_dirname", "client.destroy()", "client.token"]

        

        if(!comando){
            message.channel.send("Coloca un argumento")
            return;
        } 
        
        if(arrayprohibido.some(array => message.content.includes(array))){
            message.reply("Eso está prohibido")
            return;
        }


            try {
                const evaluacion = eval(comando)

                message.channel.send(`El codigo ha sido evaluado por el bot, resultado: \`\`\`${inspect(evaluacion, { depth: 0 } )}\`\`\``)
            } catch (e) {
                message.channel.send(`Un error ha ocurrido: \`\`\`${e}\`\`\``)
            }
        


    }

} 