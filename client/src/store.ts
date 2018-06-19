import { compose, combineReducers, createStore, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"

import { reducers } from './store/reducers'
import { byActionType, api } from "./store/middleware"

const windowAsAny = window as any
const composeEnhancers = windowAsAny.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers(reducers)

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(
        ReduxThunk,
        byActionType,
        api
    )
))

export default store
