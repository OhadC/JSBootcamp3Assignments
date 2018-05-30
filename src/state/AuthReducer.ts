import * as AppStore from "./StateStore"
import * as TreeReducer from "./TreeReducer"
import { authInitialState } from "./AuthStore"

export const login = (username: string, password: string, callback?: Function) => {
    const newCallback = () => {
        TreeReducer.fetchTree()
        if (callback) callback()
    }
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
    }, newCallback)
}

export const logout = (callback?: Function) => {
    AppStore.setState({ auth: authInitialState }, callback)
}

