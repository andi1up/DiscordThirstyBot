const Discord = require('discord.js')
const jimp = require('jimp')
const client = new Discord.Client()
const config = require('./config.json')
client.on('ready', () => {
  console.log('Started')
})

client.on('message', async message => {
  if (message.author.bot) return

  if (message.content.indexOf(config.prefix) !== 0) return

  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g)
  const command = args.shift().toLowerCase()

  if (command === 'thirst') {
    let member =
      message.mentions.members.first() || message.guild.members.get(args[0])
    if (!member) {
      return message.reply('Please mention someone')
    } else if (!member.user.avatar) {
      return message.reply('Sorry this user has no avatar.')
    } else {
      var images = [
        'thirst.png',
        `https://cdn.discordapp.com/avatars/${member.user.id}/${
          member.user.avatar
        }.png?size=2048`
      ]

      var jimps = []

      for (var i = 0; i < images.length; i++) {
        jimps.push(jimp.read(images[i]))
      }

      Promise.all(jimps)
        .then(function(data) {
          return Promise.all(jimps)
        })
        .then(function(data) {
          data[1].resize(350, 350)
          data[0].composite(data[1], 700, 200)
          data[0].write('test.png', function() {
            console.log('wrote the image')
            message.delete()
            message.channel.send({
              file: 'test.png'
            })
          })
        })
        .then(() => {
          console.log('sent')
        })
    }
  }
})

client.login(process.env.bot_token);

// MADE BY APOC
// @Apoc#4538
