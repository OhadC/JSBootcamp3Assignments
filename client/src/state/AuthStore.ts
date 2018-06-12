import { IUser } from "../models/user"

export interface IAuthState {
    user: IUser
    isAuthenticated: boolean
}

export const authInitialState: IAuthState = {
    user: {
        id: '',
        name: '',
        password: '',
        age: 0
    },
    isAuthenticated: false
}
