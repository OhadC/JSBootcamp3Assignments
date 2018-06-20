import { createServer } from 'http'

import app from './app'
import socketApp from './socketApp'

const httpServer = createServer(app)
socketApp(httpServer)

httpServer.listen(4000, () => console.log('running at port 4000'))
