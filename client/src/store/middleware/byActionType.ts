import { actionTypes, fetchMessages } from "../actions";
import { fetchTree } from "../actions";

export const byActionType = ({ dispatch, getState }: any) => (next: Function) => (action: any) => {
    switch (action.type) {
        case (actionTypes.LOGIN_SUCCESS):
            dispatch(fetchTree())
            break
        case (actionTypes.SET_ACTIVE_GROUP):
            dispatch(fetchMessages(action.payload.group.id))
            break
    }
    return next(action)
}
