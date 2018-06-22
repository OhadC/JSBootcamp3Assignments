import * as express from 'express'
import * as jwt from 'express-jwt'
import * as fs from 'fs'

const app = express()

const jwtSecret = fs.readFileSync('./jwtSecret.pub')

app
    .use(jwt({ secret: jwtSecret }))

export default app
