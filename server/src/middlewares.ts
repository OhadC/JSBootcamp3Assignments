import * as express from 'express'
import * as cors from 'cors'
import * as helmet from 'helmet'
// import * as jwt from 'express-jwt'

const app = express()

app
    .use(express.json())
    // .use(jwt({ secret: 'shhhhhhared-secret'}).unless({path: ['/token']}))
    .use(cors())
    .use(helmet())

export default app
