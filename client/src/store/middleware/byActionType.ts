import { actionTypes, fetchMessages } from "../actions"
import { fetchTree } from "../actions"

export const byActionType = ({ dispatch, getState }: any) => (next: Function) => (action: any) => {
    switch (action.type) {

        case (actionTypes.LOGIN_SUCCESS):
            next(action)
            dispatch(fetchTree())
            break

        case (actionTypes.SET_ACTIVE_GROUP):
            next(action)
            dispatch(fetchMessages(action.payload.activeGroup.id))
            break
            
        default: next(action)
    }
}
