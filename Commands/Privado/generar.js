const Discord = require('discord.js');
const Passwords = require('../../password')
const PremiumCode = require("../../Modelos/Premium");

module.exports = {
  name: "generar", 
  alias: ["generate"], 
  developer: true,

  async execute (client, message, args){

    let Cantidad = args[0];
    let TiempoC = args[1];
    let Tiempo;
    let Codigos = []

      if(!Cantidad){
        return message.reply({ content: ":x: | `Debes decir una cantidad a generar`"})
      }
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

      let msgr = await message.channel.send({ content: "✅ |Espere un momento, se esta generando el codigo..." });

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
      msgr.edit({ content: `\`\`\`${codigofinal}\`\`\``});
      
 
  }

} 