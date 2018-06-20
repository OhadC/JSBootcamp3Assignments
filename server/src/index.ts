import { createServer } from 'http'
const socketIo = require('socket.io') // types

import app from './app'
import { messageService } from './services';

const httpServer = createServer(app)
const io = socketIo(httpServer)

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('disconnect', () => {
        console.log('user disconected')
    })
    socket.on('message', message => {
        messageService.addMessage(message)
            .then(fromDbMessage => io.emit('message', fromDbMessage))
    })
})

httpServer.listen(4000, () => console.log('running at port 4000'))
