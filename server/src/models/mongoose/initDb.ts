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

    const [groups, users, messages] = await Promise.all([
        readFromJson('group'),
        readFromJson('user'),
        readFromJson('message')
    ])
    const groupIds = {},
        userIds = {}

    await Promise.all(users.map((user) => {
        const _id = userIds[user.id] = new mongoose.mongo.ObjectId()
        const { name, password, age } = user
        models.User.collection.insert({ _id, name, password, age })
    }))

    for (const group of groups) {
        const _id = groupIds[group.id] = new mongoose.mongo.ObjectId()
        const groupUserIds = group.userIds.map(userId => userIds[userId])
        const parentId = group.parentId && groupIds[group.parentId]
        const { name, isPrivate } = group
        await models.Group.collection.insert({ _id, name, userIds: groupUserIds, parentId, isPrivate })
    }

    await Promise.all(messages.map((message) => {
        const _id = new mongoose.mongo.ObjectId()
        const groupId = groupIds[message.groupId]
        const userId = groupIds[message.userId]
        const { content, date } = message
        models.Message.collection.insert({ _id, groupId, userId, content, date })
    }))

    await mongoose.disconnect()
    process.exit()

    async function readFromJson(name: string) {
        const text = await readFileAsync(`./server/mock-data/${name}.json`, 'utf8')
        return JSON.parse(text)
    }
})()
