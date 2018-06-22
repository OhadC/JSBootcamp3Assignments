import * as express from 'express'
import * as cors from 'cors'
import * as helmet from 'helmet'
import * as jwt from 'express-jwt'
import * as fs from 'fs'

const app = express()

const jwtSecret = fs.readFileSync('../jwtSecret.jwt')

app
    .use(express.json())
    .use(jwt({ secret: jwtSecret }))
    .use(cors())
    .use(helmet())

export default app
