const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')
let trafficJSON = require('./traffic-data/traffic.json')

const CHAT_GROUP_NAME = '===' // replace!

const client = new Client({
  authStrategy: new LocalAuth()
})

client.initialize()

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  client.getChats().then((chats) => {
    const myGroup = chats.find((chat) => chat.name === CHAT_GROUP_NAME)
    setInterval(() => {
      if (trafficJSON.traffic.length) {
        trafficJSON.traffic.forEach((incident, index) => {
          client.sendMessage(myGroup.id._serialized, incident)
        })
      } else {
        console.log('no traffic! &#128526;')
      }
    }, 300000)
  })
})

client.on('authenticated', (session) => {
  console.log('authenticated...', session)
})

client.on('message', (message) => {
  if (message.body === 'ping') {
    message.reply('pong')
  }
})
