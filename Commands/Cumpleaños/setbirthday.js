const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 })
const Schema = require("../../Modelos/birthdaySchema")


module.exports = {
  name: "set-user-birthday", 
  alias: [], 

execute (client, message, args){

    const months = {
        1: "Enero",
        2: "Febrero",
        3: "Marzo",
        4: "Abril",
        5: "Mayo",
        6: "Junio",
        7: "Julio",
        8: "Agosto",
        9: "Septiembre",
        10: "Octubre",
        11: "Noviembre",
        12: "Diciembre"
    }
    // $set
    // 7/15
    // ['5'. '12']

    const joined = args.join(" ")
    const split = joined.trim().split("/")

    let [ day, month ] = split;

    if(!day) {
        message.reply("Elige un dia para tu cumpleaños.")
        return;
    }

    if(!month){
        message.reply('Di un mes para tu cumpleaños')
        return;
    }

    if(isNaN(day) || isNaN(month)){
        message.reply("Tu cumpleaños debe ser un número")
        return;
    }

    day = parseInt(day);
    month = parseInt(month);

    //1 - 31
    if(!day || day > 31){
        message.reply('Elige una fecha valida.')
        return;
    }

    if(!month || month > 12){
        message.reply('Elige un mes valido.')
        return;
    }

    // 1 -> 1st
    //2 -> 2nd
    const convertedDay = suffixes(day);
    const convertedMonth = months[month]
    const birthdayString = `${convertedDay} de ${convertedMonth}`
    Schema.findOne({ User: message.author.id }, async (err, data) => {
        if(data) {
            data.Birthday = birthdayString;
            data.save()
        } else {
            new Schema({
                User: message.author.id,
                Birthday: birthdayString
            }).save();
        }
    })

    message.reply(`Tu cumpleaños ha sido anotado el ${birthdayString}`)


 }

} 
/**
 * 
 * @param {Number} number 
 */

function suffixes(number) {
    const converted = number.toString();
    const lastChar = converted.charAt(converted.length - 1);

    return lastChar == "1" 
     ? `${converted}st` 
     : lastChar == "2"
     ? `${converted}nd`
     : lastChar == "3"
     ? `${converted}rd`
     : `${converted}th` ;
}