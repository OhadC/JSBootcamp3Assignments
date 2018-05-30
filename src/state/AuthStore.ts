import { IUser } from "../models/user"

export interface IAuthState {
    user: IUser | null
    isAuthenticated: boolean
}

export const authInitialState: IAuthState = {
    user: null,
    isAuthenticated: false
}
