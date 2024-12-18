const { readdirSync } = require("fs");

module.exports = (client, Discord) => {

    const slashCarpet = readdirSync("./Slash")

    for (const folder of slashCarpet) {
        const slashFile = readdirSync(`./Slash/${folder}`)
        for (const file of slashFile) {
            const slash = require(`../Slash/${folder}/${file}`)
            client.slashcommands.set(slash.name, slash)
        }
    }

}