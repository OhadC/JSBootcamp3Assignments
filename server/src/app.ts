import * as express from 'express'

import * as middlewares from './middlewares'
import * as routes from './routes'

const app = express()

app.use(middlewares.defaults)

app.use('/auth', routes.auth)
app.use('/user', middlewares.jwt, routes.user)
app.use('/group', middlewares.jwt, routes.group)

export default app
