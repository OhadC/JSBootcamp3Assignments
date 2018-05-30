import * as MessagesReducer from "../state/MessagesStore";
import * as TreeReducer from "./TreeStore";
import * as AuthReducer from "./AuthStore";

export interface IAppState {
    messages: MessagesReducer.IMessagesState
    tree: TreeReducer.ITreeState
    auth: AuthReducer.IAuthState
}

export const appState: IAppState = {
    messages: MessagesReducer.messagesInitialState,
    tree: TreeReducer.treeInitialState,
    auth: AuthReducer.authInitialState
}

const listeners: Function[] = []

export const setState = (partialState: Function | Object, callback?: Function) => {
    if (typeof partialState === 'function') {
        const newPartialState = partialState(appState)
        setState(newPartialState, callback)
    } else if (typeof partialState === 'object') {
        for (const key in partialState) {
            if (partialState.hasOwnProperty(key) && appState.hasOwnProperty(key)) {
                appState[key] = partialState[key]
            }
        }
        console.log('AppState changed', partialState, appState)
        onStoreChanged()
        if (callback) callback()
    }
}

const onStoreChanged = () => {
    listeners.forEach(listener => listener())
}
export const subscribe = (listener: Function) => {
    listeners.push(listener)
}
export const unsubscribe = (listener: Function) => {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
        listeners.splice(index, 1)
    }
}
