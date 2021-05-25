var dgram = require('dgram')

var server = dgram.createSocket('udp4')



server.on('message', (msg, err) => {
    console.log(msg)
})

server.bind({port: 3000})
