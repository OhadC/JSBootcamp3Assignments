import { AppStore } from "./StateStore";
import { User } from "../models/user";

interface IAuthState {
    user: User | null
    isAuthenticated: boolean
}

let authInitialState: IAuthState = {
    user: null,
    isAuthenticated: false
}

class AuthReducer {
    f(){
        AppStore.name
    }
}

export { IAuthState, authInitialState, AuthReducer }
