import * as io from 'socket.io-client'

import { actionTypes } from "../actions"
import { IMessage } from '../../models'
import { addMessage } from '../actions/messages'

const socketUrl = 'http://localhost:4000'
const socket = io(socketUrl)

export const Sockethandler = ({ dispatch, getState }: any) => (next: any) => (action: any) => {
    switch (action.type) {

        case (actionTypes.LOGIN_SUCCESS):
            next(action)
            socket.on('message', (message: IMessage) => {
                const { global: { activeGroup } } = getState()
                if (activeGroup && activeGroup.id === message.groupId)
                    dispatch(addMessage(message))
            })
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
}
