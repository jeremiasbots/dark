const { MessageEmbed, MessageActionRow, Message, MessageButton, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
  name: "embedcreate",
  alias: [],

  async execute(client, message, args) {

    if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
      return;
    } //Permisos del bot 

    async function embed() {
      return new Promise(async (resolve) => {
        let interaction;

        if (message.commandId) {
          interaction = message
        }

        try {
          const finalizar = new MessageButton()
            .setLabel("Hecho")
            .setCustomId("hecho")
            .setStyle("SUCCESS")

          const cancelar = new MessageButton()
            .setLabel("Cancelar")
            .setCustomId("cancelar")
            .setStyle("DANGER")

          let name = [
            "Contenido",
            "Autor",
            "Titulo",
            "Descripcion",
            "Color",
            "Titulo URL",
            "Imagen",
            "Miniatura",
            "Footer",
            "Marca de tiempo"
            //estos es un array, un array es una lista de elementos | si vro jijijija
          ]
          let desc = [
            "Este es el contenido fuera del embed",
            "Ponemos un autor del embed",
            "Le ponemos un titulo al embed",
            "Una descripcion al embed",
            "Un color al embed",
            "Un URL para el titulo p",
            "La imagen del embed",
            "Una miniatura para el embed",
            "El pie del embed",
            "Una marca de tiempo"
          ]
          let value = [
            "setContent",
            "setAuthor",
            "setTitle",
            "setDescription",
            "setColor",
            "setURL",
            "setImage",
            "setThumbnail",
            "setFooter",
            "setTimestamp"
          ]
          let emoji = [
            "🎃",
            "🌀",
            "🤖",
            "😋",
            "🥵",
            "🎯",
            "🌸",
            "🐥",
            "🕵️‍♂️",
            "😀"
          ]

          let menuOptions = []

          const footer = "DARK-BOT"

          for (var i = 0; i < name.length; i++) {
            const datopt = {
              label: name[i],
              description: desc[i],
              value: value[i],
              emoji: emoji[i]
            }

            menuOptions.push(datopt)
          }

          let slct = new MessageSelectMenu()
            .setMaxValues(1)
            .setCustomId("embed-creator")
            .setPlaceholder("Elige una opcion")
            .addOptions([menuOptions])

          const row1 = new MessageActionRow().addComponents([finalizar, cancelar])

          const row2 = new MessageActionRow().addComponents([slct])

          const embed = new MessageEmbed()
            .setTitle("Empieza a crear un embed!")
            .setImage("https://cdn.discordapp.com/attachments/940406058243993700/940415029742796850/unknown.png")
            .setColor("#075FFF")
            .setDescription(`Seleccione cualquier ***opción*** del Menú de selección en este mensaje y yo **recopilaré toda la información y crearé un embed** para usted usando esos datos.\n\nEsto es un embed completa:`)
            .setFooter({ text: footer })

          let e;
          if (!message.commandId) {
            e = await message.reply({
              embeds: [embed],
              components: [row1, row2]
            })
          }

          const emb = new MessageEmbed().setFooter({ text: footer }).setColor("#2F3136")

          message.channel.send({ content: "** **", embeds: [emb] }).then(async (a) => {
            let lel;
            let membed;
            if (!message.commandId) {
              membed = await message.channel.messages.fetch(a.id)
              lel = await message.channel.messages.fetch(e.id)
            }
            let filter = (m) => m.user.id === (interaction ? interaction.user : message.author).id
            let collector = e.createMessageComponentCollector({
              filter,
              type: 'SELECT_MENU',
              idle: 600000
            })

            collector.on('collect', async (button) => {
              if (button.customId && button.customId === 'cancelar') {
                button.reply({ content: 'Eliminando...', ephemeral: true })

                membed.delete().catch(() => { })
                e.delete().catch(() => { })
              } else if (button.customId && button.customId === 'hecho') {
                if ((interaction ? interaction : message).member.permissions.has("ADMINISTRATOR")) {
                  button.reply({ content: "Dime a que canal enviar el embed", ephemeral: true })

                  let filter = (m) => (interaction ? interaction.user : message.author).id === m.author.id

                  let titleclr = button.channel.createMessageCollector({
                    filter,
                    time: 30000,
                    max: 1
                  })

                  titleclr.on('collect', async (m) => {
                    if (m.mentions.channels.first()) {
                      let ch = m.mentions.channels.first()
                      button.editReply({ content: 'Va 👍', ephemeral: true })

                      ch.send({
                        content: membed.content,
                        embeds: [membed.embeds[0]]
                      })
                      membed.delete().catch(() => { })
                      e.delete().catch(() => { })
                      m.delete().catch(() => { })

                      resolve(membed.embeds[0].toJSON())
                    }
                  })
                } else if (!(interaction ? interaction : message).member.permissions.has("ADMINISTRATOR")) {
                  button.reply({ content: 'Va 👍', ephemeral: true })

                  message.channel.send({
                    content: membed.content,
                    embeds: [membed.embeds[0]]
                  })
                  membed.delete().catch(() => { })
                  e.delete().catch(() => { })

                  resolve(membed.embeds[0].toJSON())
                }
              } else if (button.values[0] === "setTimestamp") {
                let btn = new MessageButton()
                  .setLabel("Aceptar")
                  .setCustomId("si")
                  .setStyle("SUCCESS")

                let btn2 = new MessageButton()
                  .setLabel("Cancelar")
                  .setCustomId("no")
                  .setStyle("DANGER")

                button.reply({
                  content: "Estas seguro de activar la marca de agua en tu embed?",
                  components: [new MessageActionRow().addComponents([btn, btn2])],
                  ephemeral: true
                })

                let filter = (m) => (interaction ? interaction.user : message.author).id === (m.user ? m.user : m.author).id
                let titleclr = button.channel.createMessageComponentCollector({
                  filter,
                  idle: 60000
                })

                titleclr.on('collect', async (btn) => {
                  if (btn.customId === "si") {
                    const url = membed.embeds[0].image ? membed.embeds[0].image : ''
                    let msg = new MessageEmbed()
                      .setTitle(membed.embeds[0].title || '')
                      .setDescription(membed.embeds[0].description || '')
                      .setColor(membed.embeds[0].color || '#36393F')
                      .setFooter({ text: membed.embeds[0].footer.text || '' })
                      .setImage(url)
                      .setURL(membed.embeds[0].url || '')
                      .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail : '')
                      .setAuthor({ name: membed.embeds[0].author?.name ? membed.embeds[0].author?.name : '', iconURL: membed.embeds[0].author?.icon_url ? membed.embeds[0].author?.icon_url : '', url: membed.embeds[0].author?.url ? membed.embeds[0].author?.url : '' })
                      .setTimestamp(new Date())

                    button.editReply({ components: [], content: "Marca de tiempo activada" })

                    membed.edit({ content: membed.content, embeds: [msg] }).catch(() => { })
                  }
                  if (btn.customId === "no") {
                    const url = membed.embeds[0].image ? membed.embeds[0].image : ''
                    let msg = new MessageEmbed()
                      .setTitle(membed.embeds[0].title || '')
                      .setDescription(membed.embeds[0].description || '')
                      .setColor(membed.embeds[0].color || '#36393F')
                      .setFooter({ text: membed.embeds[0].footer.text || '' })
                      .setImage(url)
                      .setURL(membed.embeds[0].url || '')
                      .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail : '')
                      .setAuthor({ name: membed.embeds[0].author?.name ? membed.embeds[0].author?.name : '', iconURL: membed.embeds[0].author?.icon_url ? membed.embeds[0].author?.icon_url : '', url: membed.embeds[0].author?.url ? membed.embeds[0].author?.url : '' })
                      .setTimestamp(false)

                    button.editReply({ components: [], content: "Marca de tiempo desactivada" })

                    membed.edit({ content: membed.content, embeds: [msg] }).catch(() => { })
                  }
                })
              } else if (button.values[0] === 'setAuthor') {
                let autsel = new MessageSelectMenu()
                  .setMaxValues(1)
                  .setCustomId('author-selct')
                  .setPlaceholder('Elige las opciones pa el autor')
                  .addOptions([
                    {
                      label: 'Nombre del autor',
                      description: 'Pon un nombre al autor del embed',
                      value: 'author-name'
                    },
                    {
                      label: 'Icono del autor',
                      description: 'Agrega un icono al autor del embed',
                      value: 'author-icon'
                    },
                    {
                      label: 'URL del autor',
                      description: 'Agrega un URL para el autor del mensaje',
                      value: 'author-url'
                    }
                  ])

                button.reply({
                  content: 'Seleccione una de estas opciones de "Autor"',
                  ephemeral: true,
                  components: [new MessageActionRow().addComponents([autsel])]
                })

                let filter = (m) => (interaction ? interaction.user : message.author).id === (m.user ? m.user : m.author).id
                let titleclr = button.channel.createMessageComponentCollector({
                  filter,
                  idle: 60000
                })

                titleclr.on('collect', async (menu) => {
                  menu.deferUpdate()
                  if (menu.customId !== 'author-selct') return

                  if (menu.values[0] === 'author-name') {
                    button.editReply({
                      content: 'Envia al canal un nombre pa el autor',
                      ephemeral: true,
                      components: []
                    })

                    let authclr = button.channel.createMessageCollector({
                      filter,
                      time: 30000,
                      max: 1
                    })

                    authclr.on('collect', async (m) => {
                      const url = membed.embeds[0].image ? membed.embeds[0].image.url : ''

                      let msg = new MessageEmbed()
                        .setTitle(membed.embeds[0].title || '')
                        .setDescription(membed.embeds[0].description || '')
                        .setColor(membed.embeds[0].color || '#36393F')
                        .setFooter({ text: membed.embeds[0].footer.text || '' })
                        .setImage(url)
                        .setURL(membed.embeds[0].url || '')
                        .setThumbnail(
                          membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : ''
                        )
                        .setAuthor({ name: m.content, iconURL: membed.embeds[0].author?.icon_url ? membed.embeds[0].author?.icon_url : '', url: membed.embeds[0].author?.url ? membed.embeds[0].author?.url : '' })
                        .setTimestamp(
                          membed.embeds[0].timestamp ? new Date() : false
                        )

                      titleclr.stop()
                      m.delete().catch(() => { })

                      membed.edit({ content: membed.content, embeds: [msg] }).catch(() => { })
                    })
                  }

                  if (menu.values[0] === 'author-icon') {
                    button.editReply({
                      content: 'Enviame un icono para el autor(Archivo/URL)',
                      ephemeral: true,
                      components: []
                    })

                    let authclr = button.channel.createMessageCollector({
                      filter,
                      time: 30000,
                      max: 1
                    })

                    authclr.on('collect', async (m) => {
                      const url = membed.embeds[0].image ? membed.embeds[0].image.url : ''

                      let isthumb = m.content.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null || m.attachments.first().proxyURL || ''
                      if (!isthumb) return button.editReply({
                        content: 'Oe, esa no es una imagen, proporciona un link o un archivo adjunto',
                        ephemeral: true
                      })

                      let msg = new MessageEmbed()
                        .setTitle(membed.embeds[0].title || '')
                        .setDescription(membed.embeds[0].description || '')
                        .setColor(membed.embeds[0].color || '#36393F')
                        .setFooter({ text: membed.embeds[0].footer.text || '' })
                        .setImage(url)
                        .setURL(membed.embeds[0].url || '')
                        .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
                        .setTimestamp(
                          membed.embeds[0].timestamp ? new Date() : false
                        )
                        .setAuthor({ name: membed.embeds[0].author?.name ? membed.embeds[0].author?.name : '', iconURL: m.content || m.attachments.first().url || '', url: membed.embeds[0].author?.url ? membed.embeds[0].author?.url : '' })

                      titleclr.stop()
                      m.delete().catch(() => { })

                      membed.edit({ content: membed.content, embeds: [msg] }).catch(() => { })
                    })
                  }

                  if (menu.values[0] === 'author-url') {
                    button.editReply({
                      content: 'Enviame un url para el autor',
                      ephemeral: true,
                      components: []
                    })

                    let authclr = button.channel.createMessageCollector({
                      filter,
                      time: 30000,
                      max: 1
                    })

                    authclr.on('collect', async (m) => {
                      const url = membed.embeds[0].image ? membed.embeds[0].image.url : ''

                      if (!m.content.startsWith('http')) {
                        m.delete().catch(() => { })
                        return button.editReply(
                          'Una URL debe comenzar con el protocolo http. Proporcione una URL válida.'
                        )
                      } else {
                        let msg = new MessageEmbed()
                          .setTitle(membed.embeds[0].title || '')
                          .setDescription(membed.embeds[0].description || '')
                          .setColor(membed.embeds[0].color || '#36393F')
                          .setFooter({ text: membed.embeds[0].footer.text || '' })
                          .setImage(url)
                          .setURL(membed.embeds[0].url || '')
                          .setThumbnail(membed.embeds[0].thumbnail ? membed.embeds[0].thumbnail.url : '')
                          .setAuthor({ name: membed.embeds[0].author?.name ? membed.embeds[0].author?.name : '', iconURL: membed.embeds[0].author?.icon_url ? membed.embeds[0].author?.icon_url : '', url: m.content || '' })
                          .setTimestamp(membed.embeds[0].timestamp ? new Date() : false)

                        titleclr.stop()
                        m.delete().catch(() => { })

                        membed.edit({ content: membed.content, embeds: [msg] }).catch(() => { })
                      }
                    })
                  }
                })
              } else if (button.values[0] === 'setContent') {
                button.reply({
                  content:
                    "Enviame a continuacion el contenido fuera del embed",
                  ephemeral: true
                })
                let filter = (m) =>
                  (interaction ? interaction.user : message.author).id ===
                  m.author.id
                let titleclr = button.channel.createMessageCollector({
                  filter,
                  time: 30000,
                  max: 1
                })
  
                titleclr.on('collect', async (m) => {
                  const url = membed.embeds[0].image
                    ? membed.embeds[0].image.url
                    : ''
  
                  let msg = new MessageEmbed()
                    .setTitle(membed.embeds[0].title || '')
                    .setDescription(membed.embeds[0].description || '')
                    .setColor(membed.embeds[0].color || '#36393F')
                    .setFooter({ text: membed.embeds[0].footer.text || '' })
                    .setImage(url)
                    .setURL(membed.embeds[0].url || '')
                    .setThumbnail(
                      membed.embeds[0].thumbnail
                        ? membed.embeds[0].thumbnail.url
                        : ''
                    )
                    .setTimestamp(membed.embeds[0].timestamp ? new Date() : false)
                    .setAuthor({
                      name: membed.embeds[0].author?.name
                        ? membed.embeds[0].author?.name
                        : '',
                      iconURL: membed.embeds[0].author?.icon_url
                        ? membed.embeds[0].author?.icon_url
                        : '',
                      url: membed.embeds[0].author?.url
                        ? membed.embeds[0].author?.url
                        : ''
                      })
  
                  titleclr.stop()
                  m.delete().catch(() => {})
  
                  membed
                    .edit({ content: m.content, embeds: [msg] })
                    .catch(() => {})
                })
              }
            })
          })

        }
        catch (err) {
          console.log(`Un error nuevo | EmbedCreate | Error: ${err.stack}`)
        }
      })
    }


    embed()
  }

} 