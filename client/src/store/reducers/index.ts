import { globalReducer, IGlobalState } from './global'
import { authReducer, IAuthState } from './auth'
import { messagesReducer, IMessagesState } from './messages'
import { treeReducer, ITreeState } from './tree'

const reducers = { global: globalReducer, auth: authReducer, messages: messagesReducer, tree: treeReducer }

interface IState {
    global: IGlobalState
    auth: IAuthState
    messages: IMessagesState
    tree: ITreeState
}

export { reducers, IState }
