import { Server } from 'http'
import * as socketIo from 'socket.io'
import * as jsonwebtoken from 'jsonwebtoken'

import { messageService } from './services'
import { IClientMessage } from './models'
import { jwtSecret } from '.'

const socketApp = (httpServer: Server) => {
    const io: socketIo.Server = socketIo(httpServer)

    io.use((socket: any, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            jsonwebtoken.verify(socket.handshake.query.token, jwtSecret, (err, decoded) => {
                if (err) return next(new Error('Authentication error'))
                socket.decoded = decoded
                next();
            })
        } else {
            next(new Error('Authentication error'));
        }
    })

    io.on('connection', makeSocket)

    function makeSocket(socket: socketIo.Socket) {
        // TODO: take userID from socket.decoded
        socket.on('message', onMessage)
    }

    async function onMessage(message) {
        console.log(message)
        const fromDbMessage: IClientMessage = await messageService.addMessage(message)
        io.emit('message', fromDbMessage)
    }
}

export default socketApp
