const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const { Modal, TextInputComponent, showModal } = require("discord-modals")
const Passwords = require('../../password')
const PremiumCode = require("../../Modelos/Premium");
const PremiumUltra = require("../../Modelos/PremiumUltra")

module.exports = {
    name: "keygen",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Genera una clave para el premium (developer)",
    type: 1,
    developer: true,
    options: [
        {
          name: "tipo",
          description: "El tipo de premium que se va a generar",
          type: 3,
          required: true,
          choices: [
            {
              name: "Premium Classic",
              value: "basic"
            },
            {
              name: "Premium",
              value: "ultra"
            }
          ]
        },
        {
            name: "cantidad",
            description: "La cantidad de claves que quieres generar (requerido)",
            type: 3,
            required: true 
        },
        {
            name: "tiempo",
            description: "El tiempo por el que quieres que el usuario tenga el premium (opcional) si no se pone sera infinito",
            type: 3,
            choices: [
              {
                name: "1 dia",
                value: "1d"
              },
              {
                name: "1 mes",
                value: "1m"
              },
              {
                name: "1 año",
                value: "1y"
              }
            ]
        }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){

      if(interaction.options.getString("tipo") === "basic"){

         let Cantidad = interaction.options.getString("cantidad")
         let TiempoC = interaction.options.getString("tiempo")
         let Tiempo;
         let Codigos = []
     
           if(!TiempoC){
             Tiempo = 0;
             TiempoC = "Infinito";
           }
           if(TiempoC.endsWith("d")){
             Tiempo = 86400000;
             TiempoC = "1Dia"
           }
           if(TiempoC.endsWith("m")){
             Tiempo = 2592000000;
             TiempoC = "1Mes";
           }
           if(TiempoC.endsWith("y")){
             Tiempo = 31557600000;
             TiempoC = "1Año";
           }
    
     
           //momento ponerme modo javascript creador: developer ultra maximo que sabe all XD 😎
     
           for(let i = 0; i < Cantidad; i++){
             const codigo = `${TiempoC}:[${Passwords(6)}.-${Passwords(5)}|{${Passwords(3)}}]` // este seria el codigo que el bot mande | le di esta forma pa que cuando lo usen se vea mas piola xD y sea mas dificil de descubrirlo
             Codigos.push(codigo)
             const codigito = new PremiumCode({
               code: codigo,
               time: Tiempo,
               timestamp: Date.now(),
               redemmed: false
             })
             await codigito.save()
           }
           const codigofinal = Codigos.map(c => `\n${c}`).join(" ")
           interaction.reply({ content: `\`\`\`${codigofinal}\`\`\``, ephemeral: true });

      } else if(interaction.options.getString("tipo") === "ultra"){
        
        let Cantidad = interaction.options.getString("cantidad")
        let TiempoC = interaction.options.getString("tiempo")
        let Tiempo;
        let Codigos = []
    
          if(!TiempoC){
            Tiempo = 0;
            TiempoC = "Infinito";
          }
          if(TiempoC.endsWith("d")){
            Tiempo = 86400000;
            TiempoC = "1Dia"
          }
          if(TiempoC.endsWith("m")){
            Tiempo = 2592000000;
            TiempoC = "1Mes";
          }
          if(TiempoC.endsWith("y")){
            Tiempo = 31557600000;
            TiempoC = "1Año";
          }
   
    
          //momento ponerme modo javascript creador: developer ultra maximo que sabe all XD 😎
    
          for(let i = 0; i < Cantidad; i++){
            const codigo = `Guild:${TiempoC}:[${Passwords(6)}.-${Passwords(5)}|{${Passwords(3)}}]` // este seria el codigo que el bot mande | le di esta forma pa que cuando lo usen se vea mas piola xD y sea mas dificil de descubrirlo
            Codigos.push(codigo)
            const codigito = new PremiumUltra({
              code: codigo,
              time: Tiempo,
              timestamp: Date.now(),
              redemmed: false
            })
            await codigito.save()
          }
          const codigofinal = Codigos.map(c => `\n${c}`).join(" ")
          interaction.reply({ content: `\`\`\`${codigofinal}\`\`\``, ephemeral: true });
      }
           

            


    
        

    }
}