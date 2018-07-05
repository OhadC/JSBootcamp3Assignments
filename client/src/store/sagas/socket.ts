import { AnyAction } from "redux"
import { eventChannel, Channel } from "redux-saga"
import { takeEvery, all, take, select, put } from 'redux-saga/effects'
import * as io from 'socket.io-client'

import { actionTypes, addMessage } from "../actions"
import { IClientMessage } from "../../models"
import { IAppState } from "../reducers";

const socketUrl = 'http://localhost:4000'
let socket: SocketIOClient.Socket
let channel: Channel<IClientMessage>

export function* watchSocket() {
    yield all([
        takeEvery(actionTypes.LOGIN_SUCCESS, connectToSocketSaga),
        takeEvery(actionTypes.SEND_MESSAGE, sendMessageSaga),
        takeEvery(actionTypes.LOGOUT, disconnectToSocketSaga),
    ])
}

function* connectToSocketSaga(action: AnyAction) {
    socket = io.connect(socketUrl, {
        query: { token: action.payload.token }
    })

    channel = eventChannel(emitter => {
        socket.on('message', (message: IClientMessage) => {
            emitter(message)
        })

        return socket.removeAllListeners
    })

    while (true) {
        const message: IClientMessage = yield take(channel)
        const state: IAppState = yield select()
        if (state.tree.active && state.tree.active.id === message.groupId) {
            yield put(addMessage(message))
        }
    }
}

function* sendMessageSaga(action: AnyAction) {
    yield socket.emit('message', action.payload.message)
}

function* disconnectToSocketSaga(action: AnyAction) {
    yield channel.close()
}
