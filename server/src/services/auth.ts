import * as jsonwebtoken from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import * as util from 'util'

import { userService } from '.'
import { jwtSecret } from '..'

const jwtSignAsync = util.promisify(jsonwebtoken.sign) as any

const saltRounds = 10

export const login = async (name: string, plaintextPassword: string) => {
    console.log(name, plaintextPassword)
    if (await userService.validateUser(name, plaintextPassword)) {
        const user = await userService.getUserByName(name)
        const token = await jwtSignAsync(user, jwtSecret, {expiresIn: '1h'})
        return { user, token }
    }
    throw Error('Invalid name or password')
}

// export const join = async (name: string, plaintextPassword: string) => {
//     const hashedPassword = await getHashedPassword(plaintextPassword)
//     return userService.addUser(name, hashedPassword)
// }

export const getHashedPassword = async (plaintextPassword) => {
    return bcrypt.hash(plaintextPassword, saltRounds)
}

export const checkPassword = async (plaintextPassword, hashedPassword) => {
    return bcrypt.compare(plaintextPassword, hashedPassword)
}
