import * as express from 'express'
import * as jwt from 'express-jwt'
import { jwtSecret } from '..';

const app = express()

app
    .use(jwt({ secret: jwtSecret }))
    .use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({ message: 'invalid token' })
        }
    })

export default app
