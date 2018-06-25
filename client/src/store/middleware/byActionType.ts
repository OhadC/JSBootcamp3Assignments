import { AnyAction } from "redux"

import { actionTypes, fetchMessages } from "../actions"

export const byActionType = ({ dispatch, getState }: any) => (next: Function) => (action: AnyAction) => {
    switch (action.type) {

        case (actionTypes.SET_ACTIVE_GROUP):
            next(action)
            dispatch(fetchMessages(action.payload.group.id))
            break

        default: next(action)
    }
}
