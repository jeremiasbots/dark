const Discord = require("discord.js")
const client = new Discord.Client({ intents: 3276543 })

async function build(id, command, desc, int, response){
    const slash = client.slashcommands.map(x => x)

    

    const object = {
        name: command,
        description: desc,
        type: 1,
        aplication: (client, int) => {
           int.reply(response)
        }
    }

    const uwu = await client.guilds.cache.get(id).commands.set(slash + object)


    

    console.log("Slash commands cargados")
}

function Item(n, d, p){
    this.name = n;
    this.description = d;
    this.price = p;
}

function ephemeralReply(int, cont){
    int.reply({ content: cont, ephemeral: true })
}

module.exports = {
    build,
    Item,
    ephemeralReply
}