import { createServer } from 'http'
import * as fs from 'fs'

export const jwtSecret = fs.readFileSync('./jwtSecret.pub')

import app from './app'
import socketApp from './socketApp'

const httpServer = createServer(app)
socketApp(httpServer)

httpServer.listen(4000, () => console.log('running at port 4000'))
