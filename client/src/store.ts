import { compose, combineReducers, createStore, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { reducers } from './store/reducers'
import { byActionType, api } from './store/middleware'
import { watchGroups, watchMessages, watchUsers, watchSocket } from "./store/sagas"

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createBrowserHistory()

const rootReducer = combineReducers(reducers)

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(connectRouter(history)(rootReducer), composeEnhancers(
    applyMiddleware(
        routerMiddleware(history),
        ReduxThunk,
        sagaMiddleware,
        byActionType,
        api
    )
))

sagaMiddleware.run(watchGroups)
sagaMiddleware.run(watchUsers)
sagaMiddleware.run(watchMessages)
sagaMiddleware.run(watchSocket)
