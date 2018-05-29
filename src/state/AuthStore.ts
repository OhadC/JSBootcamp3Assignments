import { AppStore } from "./StateStore"
import { IUser } from "../models/user"

interface IAuthState {
    user: IUser | null
    isAuthenticated: boolean
}

let authInitialState: IAuthState = {
    user: null,
    isAuthenticated: false
}

class AuthReducer {
    static login(username: string, password: string, callback?: Function) {
        AppStore.setState({
            auth: {
                user: {
                    id: '1',
                    name: username,
                    password: password,
                    age: 1
                },
                isAuthenticated: true
            }
        }, callback)
    }
}

export { IAuthState, authInitialState, AuthReducer }
