import * as MessagesStore from "../state/MessagesStore"
import * as TreeStore from "./TreeStore"
import * as AuthStore from "./AuthStore"

export interface IAppState {
    messages: MessagesStore.IMessagesState
    tree: TreeStore.ITreeState
    auth: AuthStore.IAuthState
}

export class StateStore {
    static appState: IAppState = {
        messages: MessagesStore.messagesInitialState,
        tree: TreeStore.treeInitialState,
        auth: AuthStore.authInitialState
    }

    static listeners: Function[] = []

    static setState = (partialState: Function | Object, callback?: Function) => {
        if (typeof partialState === 'function') {
            const newPartialState = partialState(StateStore.appState)
            StateStore.setState(newPartialState, callback)
        } else if (typeof partialState === 'object') {
            for (const key in partialState) {
                if (partialState.hasOwnProperty(key) && StateStore.appState.hasOwnProperty(key)) {
                    StateStore.appState[key] = partialState[key]
                }
            }
            console.log('AppState changed', partialState, StateStore.appState)
            StateStore.onStoreChanged()
            if (callback) callback()
        }
    }

    static onStoreChanged = () => {
        StateStore.listeners.forEach(listener => listener(StateStore.appState))
    }

    static subscribe = (listener: Function) => {
        StateStore.listeners.push(listener)
    }

    static nsubscribe = (listener: Function) => {
        const index = StateStore.listeners.indexOf(listener);
        if (index !== -1) {
            StateStore.listeners.splice(index, 1)
        }
    }
}
