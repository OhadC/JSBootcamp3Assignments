import { globalReducer, IGlobalState } from './global'
import { authReducer, IAuthState } from './auth'
import { adminReducer, IAdminState } from './admin'
import { messagesReducer, IMessagesState } from './messages'
import { treeReducer, ITreeState } from './tree'
import { groupsReducer, IGroupsState } from './groups'
import { usersReducer, IUsersState } from './users'

const reducers = {
    global: globalReducer,
    auth: authReducer,
    admin: adminReducer,
    messages: messagesReducer,
    tree: treeReducer,
    groups: groupsReducer,
    users: usersReducer
}

interface IAppState {
    global: IGlobalState
    auth: IAuthState
    admin: IAdminState
    messages: IMessagesState
    tree: ITreeState,
    groups: IGroupsState,
    users: IUsersState
}

export { reducers, IAppState }
