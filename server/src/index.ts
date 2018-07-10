import { createServer } from 'http'
import * as mongoose from 'mongoose'
import * as fs from 'fs'

export const jwtSecret = fs.readFileSync('./jwtSecret.pub')

import app from './app'
import socketApp from './socketApp'

const httpServer = createServer(app)
socketApp(httpServer)

mongoose.connect('mongodb://localhost:27017/ChatApp')

httpServer.listen(4000, () => console.log('running at port 4000'))
