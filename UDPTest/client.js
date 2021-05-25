var dgram = require('dgram')
var client = dgram.createSocket('udp4')

client.send(Buffer.from('Data'),2222,'192.168.56.1')