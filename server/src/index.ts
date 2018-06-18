import { createServer } from 'http'

import app from './app'

const httpServer = createServer(app)

httpServer.listen(4000, () => console.log('running at port 4000'))
