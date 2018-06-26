import { actionTypes, fetchMessages } from "../actions"
import { fetchTree } from "../actions"

export const byActionType = ({ dispatch, getState }: any) => (next: Function) => (action: any) => {
    switch (action.type) {

        case (actionTypes.LOGIN_SUCCESS):
            next(action)
            dispatch(fetchTree())
            break

        case (actionTypes.SET_ACTIVE):
            next(action)
            dispatch(fetchMessages(action.payload.active.id))
            break
            
        default: next(action)
    }
}
