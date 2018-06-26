import * as io from 'socket.io-client'
import { AnyAction } from 'redux'

import { actionTypes } from "../actions"
import { IClientMessage } from '../../models'
import { addMessage } from '../actions/messages'
// import { socketLoginSuccess } from '../actions/global'

const socketUrl = 'http://localhost:4000'
let socket: SocketIOClient.Socket

export const Sockethandler = ({ dispatch, getState }: any) => (next: any) => (action: AnyAction) => {
    switch (action.type) {

        case (actionTypes.LOGIN_SUCCESS):
            next(action)
            socket = io
                .connect(socketUrl, {
                    query: { token: action.payload.token }
                })
            socket.on('message', onNewMessage)
            break

        case (actionTypes.SEND_MESSAGE):
            next(action)
            socket.emit('message', action.payload.message)
            break

        case (actionTypes.LOGOUT):
            next(action)
            socket.removeAllListeners()
            break

        default: next(action)
    }

    function onNewMessage(message: IClientMessage) {
        const { tree: { activeGroup } } = getState()
        if (activeGroup && activeGroup.id === message.groupId)
            dispatch(addMessage(message))
    }
}
