import * as io from 'socket.io-client'
import { AnyAction } from 'redux'

import { actionTypes } from "../actions"
import { IClientMessage } from '../../models'
import { addMessage } from '../actions/messages'

const socketUrl = 'http://localhost:4000'
const socket = io(socketUrl)

export const Sockethandler = ({ dispatch, getState }: any) => (next: any) => (action: AnyAction) => {
    switch (action.type) {

        case (actionTypes.LOGIN_SUCCESS):
            next(action)
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
        const { global: { activeGroup } } = getState()
        if (activeGroup && activeGroup.id === message.groupId)
            dispatch(addMessage(message))
    }
}
