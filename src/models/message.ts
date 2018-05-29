interface IMessage {
    id: string
    groupId?: string
    userId: string
    content: string
    date: string
}

export { IMessage }