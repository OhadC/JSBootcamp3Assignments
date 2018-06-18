import { compose, combineReducers, createStore, applyMiddleware } from "redux";

import { globalReducer } from './store/reducers'
import { authReducer } from './store/reducers'
import { messagesReducer } from './store/reducers'
import { treeReducer } from './store/reducers'
import ReduxThunk from "redux-thunk";
import { byActionType } from "./store/middleware";

const windowIfDefined = window as any;
const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    global: globalReducer,
    auth: authReducer,
    messages: messagesReducer,
    tree: treeReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(
        ReduxThunk,
        byActionType
    )
))

export default store
