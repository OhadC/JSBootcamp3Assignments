import * as express from 'express'

import * as middlewares from './middlewares'
import * as routes from './routes'

const app = express()

app.use(middlewares.defaults)

app.use('/auth', routes.auth)
// app.use('/user', middlewares.jwt, routes.user)
// app.use('/group', middlewares.jwt, routes.group)
// app.use('/message', middlewares.jwt, routes.message)

app.use('/user', routes.user)
app.use('/group', routes.group)
app.use('/message', routes.message)


export default app
