import * as util from 'util'
import * as fs from 'fs'
import * as mongoose from 'mongoose'

import * as models from './models'

const readFileAsync = util.promisify(fs.readFile);

(async () => {
    mongoose.connect('mongodb://localhost:27017/ChatApp')



    await Promise.all([
        models.Group.deleteMany({}),
        models.User.deleteMany({}),
        models.Message.deleteMany({}),
    ])

    // const [groups, users, messages] = await Promise.all([
    //     readFromJson('group'),
    //     readFromJson('user'),
    //     readFromJson('message')
    // ])
    // 
    // await Promise.all([
    //     Promise.all(groups.map((group) => new models.Group(group).save())),
    //     Promise.all(users.map((user) => new models.User(user).save())),
    //     Promise.all(messages.map((message) => new models.Message(message).save())),
    // ])
    
    await mongoose.disconnect()
    process.exit()

    async function readFromJson(name: string) {
        const text = await readFileAsync(`./server/mock-data/${name}.json`, 'utf8')
        return JSON.parse(text)
    }
})()
