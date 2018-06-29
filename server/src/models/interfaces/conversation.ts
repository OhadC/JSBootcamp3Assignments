export interface IConversation {
    id: string
    ofType: "group" | "user"
    parentIds: string[]
}

export interface IServerConversation {
    id: string
    ofType: "group" | "user"
    parentIds: string[]
}

export interface IClientConversation {
    id: string
    ofType: "group" | "user"
    parentIds: string[]
}
