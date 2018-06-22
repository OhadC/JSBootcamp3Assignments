import * as jsonwebtoken from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import * as fs from 'fs'
import * as util from 'util'

import { db } from '../models';
import { userService } from '.';

const jwtSignAsync = util.promisify(jsonwebtoken.sign)
// const writeFileAsync = util.promisify(fs.writeFile)

const saltRounds = 10
const jwtSecret = fs.readFileSync('./jwtSecret.pub')

export const login = async (name: string, plaintextPassword: string) => {
    if (await userService.validateUser(name, plaintextPassword)) {
        const user = await userService.getUserByName(name)
        const token = await jwtSignAsync(user, jwtSecret)
        return { user, token }
    }
    throw Error('Invalid name or password')
}

export const join = async (name: string, plaintextPassword: string) => {
    const hashedPassword = await getHashedPassword(plaintextPassword)
    return userService.addUser(name, hashedPassword)
}

const getHashedPassword = async (plaintextPassword) => {
    return bcrypt.hash(plaintextPassword, saltRounds)
}

export const checkPassword = async (plaintextPassword, hashedPassword) => {
    return bcrypt.compare(plaintextPassword, hashedPassword)
}
