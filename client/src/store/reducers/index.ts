import { globalReducer, IGlobalState } from './global'
import { authReducer, IAuthState } from './auth'
import { adminReducer, IAdminlState } from './admin'
import { messagesReducer, IMessagesState } from './messages'
import { treeReducer, ITreeState } from './tree'

const reducers = {
    global: globalReducer,
    auth: authReducer,
    admin: adminReducer,
    messages: messagesReducer,
    tree: treeReducer
}

interface IAppState {
    global: IGlobalState
    auth: IAuthState
    admin: IAdminlState
    messages: IMessagesState
    tree: ITreeState
}

export { reducers, IAppState }
