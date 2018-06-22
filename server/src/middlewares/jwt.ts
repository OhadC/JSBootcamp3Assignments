import * as express from 'express'
import * as jwt from 'express-jwt'
import * as fs from 'fs'

const app = express()

const jwtSecret = fs.readFileSync('./jwtSecret.pub')

app
    .use(jwt({ secret: jwtSecret }))
    .use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
          res.status(401).send({message: 'invalid token'});
        }
      })

export default app
