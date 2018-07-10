export interface IUser {
    _id: string
    name: string
    password?: string
    age: number
}

export interface IServerUser extends IUser {
    _id: string
    name: string
    password: string
    age: number
}

export interface IClientUser extends IUser {
    _id: string
    name: string
    password: undefined
    age: number
}
