const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 })
const { glob } = require('glob')


module.exports = {
  name: "reload-cmd", 
  alias: [], 
  developer: true,

async execute (client, message, args){

    client.commands.sweep(() => true);

    glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
        if(err) return console.log(err)
        filePaths.forEach(async (file) => {
            delete require.cache[require.resolve(file)];

            const pull = require(file)
            if(pull.name){
                console.log(`👻 Comando reiniciado ${pull.name} `)
                client.commands.set(pull.name, pull)
            }
            if(pull.aliases && Array.isArray(pull.aliases)) {
                pull.aliases.forEach((alias) => {
                    client.aliases.set(alias, pull.name)
                });
            }
        });
    });

    return message.reply('🤑 Comandos reiniciados con exito!')




 }

} 