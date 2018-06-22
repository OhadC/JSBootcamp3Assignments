export interface IUser {
    id: string
    name: string
    password?: string
    age: number
}

export interface IServerUser extends IUser {
    id: string
    name: string
    password: string
    age: number
}

export interface IClientUser extends IUser {
    id: string
    name: string
    password: undefined
    age: number
}
