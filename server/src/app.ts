import * as express from 'express'
// import * as socketIO from 'socket.io'

import middlewares from './middlewares'
import * as routes from './routes'

const app = express()
// const io = socketIO(httpServer)

app.use(middlewares)

app.use('/user', routes.user)
app.use('/group', routes.group)
app.use('/message', routes.message)
app.use('/tree', routes.tree)

export default app
