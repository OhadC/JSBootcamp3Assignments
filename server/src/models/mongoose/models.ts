import { Schema, model } from 'mongoose'

// TODO: required
const GroupSchema = new Schema({
    parentId: { type: Schema.Types.ObjectId, ref: 'group' },
    name: String,
    userIds: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    isPrivate: Boolean
})
GroupSchema.virtual('users', {
    ref: 'user',
    localField: 'userIds',
    foreignField: '_id'
})

export const Group = model('group', GroupSchema)

const UserSchema = new Schema({
    name: String,
    password: String,
    age: Number
})
export const User = model('user', UserSchema)

const MessageSchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, ref: 'group' },
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    content: String,
    date: Date
})
MessageSchema.virtual('user', {
    ref: 'user',
    localField: 'userId',
    foreignField: '_id'
})

export const Message = model('message', MessageSchema)
