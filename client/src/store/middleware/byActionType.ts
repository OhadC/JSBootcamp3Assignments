import { actionTypes, fetchMessages } from "../actions";
import { fetchTree } from "../actions";

export const byActionType = ({ dispatch, getState }: any) => (next: Function) => (action: any) => {
    switch (action.type) {
        case (actionTypes.LOGIN_SUCCESS):
            next(action)
            return dispatch(fetchTree())
        case (actionTypes.SET_ACTIVE_GROUP):
            next(action)
            return dispatch(fetchMessages(action.payload.group.id))
    }
    return next(action)
}
