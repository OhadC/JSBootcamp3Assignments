import { compose, combineReducers, createStore, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { reducers } from './store/reducers'
import { byActionType, api } from './store/middleware'

const windowAsAny = window as any
const composeEnhancers = windowAsAny.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createBrowserHistory()

const rootReducer = combineReducers(reducers)

export const store = createStore(connectRouter(history)(rootReducer), composeEnhancers(
    applyMiddleware(
        routerMiddleware(history),
        ReduxThunk,
        byActionType,
        api
    )
))
