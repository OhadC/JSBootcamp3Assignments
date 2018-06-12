import { StateStore } from "./StateStore"
import * as TreeReducer from "./TreeReducer"
import { authInitialState } from "./AuthStore"

export const login = (username: string, password: string, callback?: Function) => {
    const newCallback = () => {
        TreeReducer.fetchTree()
        if (callback) callback()
    }
    StateStore.setState({
        auth: {
            user: {
                id: '1',
                name: username,
                password: password,
                age: 1
            },
            isAuthenticated: true
        }
    }, newCallback)
}

export const logout = (callback?: Function) => {
    StateStore.setState({ auth: authInitialState }, callback)
}

