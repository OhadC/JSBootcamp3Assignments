import { IMessagesState, messagesInitialState } from "../state/MessagesStore";
import { IAuthState, authInitialState } from "./AuthStore";
import { treeInitialState, ITreeState } from "./TreeStore";

interface IAppState {
    messages: IMessagesState
    tree: ITreeState
    auth: IAuthState
}

const appState: IAppState = {
    messages: messagesInitialState,
    tree: treeInitialState,
    auth: authInitialState
}

class AppStore {
    static listeners: Function[] = []

    static setState(partialState: Function | Object, callback?: Function) {
        if (typeof partialState === 'function') {
            AppStore.setState(partialState(appState), callback)
        } else if (typeof partialState === 'object') {
            console.log(partialState)
            for (const key in partialState) {
                if (partialState.hasOwnProperty(key) && appState.hasOwnProperty(key)) {
                    console.log(key)
                    appState[key] = partialState[key]
                }
            }
            AppStore.onStoreChanged()
            if (callback) callback()
        }
    }

    static onStoreChanged() {
        AppStore.listeners.forEach(listener => listener())
    }
    static subscribe(listener: Function) {
        this.listeners.push(listener)
    }
    static unsubscribe(listener: Function) {
        const index = AppStore.listeners.indexOf(listener);
        if (index !== -1) {
            AppStore.listeners.splice(index, 1)
        }
    }
}

export { appState, AppStore }
