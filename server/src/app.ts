import * as express from 'express'
import { Server } from 'http'
import * as socketIO from 'socket.io'

import middlewares from './middlewares'
import { userRoutes } from './routes'

const app = express()
const httpServer = new Server(app)
const io = socketIO(httpServer)

app.use(middlewares)

app.use('/user', userRoutes)


httpServer.listen(4000, () => console.log('running at port 4000'))
