const { readdirSync } = require('fs')

module.exports = (client, Discord) => {
    const eventFolder = readdirSync('./Events')
    for(const folder of eventFolder){
        const eventFile = readdirSync(`./Events/${folder}`).filter(archivo => archivo.endsWith(".js"));
        for(const file of eventFile){
            const event = require(`../Events/${folder}/${file}`);
            if(event.once){
                client.once(event.name, (...args) => event.execute(...args, client, Discord));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client, Discord));
            }
        }
    }
} // AAAA porque aca va muy lag

 