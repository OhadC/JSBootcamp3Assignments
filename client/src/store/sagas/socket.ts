import { AnyAction } from "redux"
import { eventChannel, Channel } from "redux-saga"
import { takeEvery, all, take, select, put } from 'redux-saga/effects'
import * as io from 'socket.io-client'

import { actionTypes, addMessage } from "../actions"
import { IClientMessage } from "../../models"
import { IAppState } from "../reducers"
import { checkTypeAndStatus } from "./utils"

const socketUrl = 'http://localhost:4000'
let socket: SocketIOClient.Socket
let channel: Channel<IClientMessage>

export function* watchSocket() {
    yield all([
        takeEvery(checkTypeAndStatus(actionTypes.LOGIN,actionTypes.SUCCESS), connectToSocketSaga),
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
        if (state.tree.active && state.tree.active._id === message.groupId) {
            yield put(addMessage(message))
        }
    }
}

function* sendMessageSaga(action: AnyAction) {
    const { tree: { active: { _id: groupId } }, auth: { userId } }: any = yield select()
    const { content } = action.payload
    const message = {
        groupId,
        userId,
        content,
        date: (new Date()).toISOString(),
    }
    yield socket.emit('message', message)
}

function* disconnectToSocketSaga(action: AnyAction) {
    yield channel.close()
}
