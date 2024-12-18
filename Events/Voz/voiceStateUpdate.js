const { Client, Message } = require('discord.js')
const mapeado = new Map()
const Schema = require("../../Modelos/jtcSchema.js")

module.exports = {
    name: "voiceStateUpdate",
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(oldState, newState) {

        let data = await Schema.findOne({ Guild: newState.guild.id })

        if(!data) return;

        if(!data.Channel) return;


        if(!oldState.channelId && newState.channelId){
            if(newState.channelId === data.Channel) crearSala(newState)
        }

        



        if(oldState.channelId && !newState.channelId) {
            if(mapeado.get(`temporal_${oldState.guild.id}_${oldState.channelId}`)) {
              let canalvoz = oldState.guild.channels.cache.get(mapeado.get(`temporal_${oldState.guild.id}_${oldState.channelId}`))
        
              if(canalvoz) {
                if(canalvoz.members.size < 1) {
                  canalvoz.delete()
                  mapeado.delete(`temporal_${oldState.guild.id}_${oldState.channelId}`)
                }
              } 
         }
    }
}

}

async function crearSala(newState){
    newState.guild.channels.create(`Sala de ${newState.member.user.username}`, {
        type: "GUILD_VOICE",
        parent: newState.channel.parent
    }).then(canal => {
        newState.member.voice.setChannel(canal)
        mapeado.set(`temporal_${newState.guild.id}_${canal.id}`, canal.id)
    })
}
