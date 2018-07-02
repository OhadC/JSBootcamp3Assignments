import { actionTypes, fetchMessages, fetchAllUsers, fetchGroups, fetchAllGroups } from "../actions"

export const byActionType = ({ dispatch, getState }: any) => (next: Function) => (action: any) => {
    switch (action.type) {

        case (actionTypes.LOGIN_SUCCESS):
            next(action)
            dispatch(fetchGroups())
            break

        case (actionTypes.SET_ACTIVE):
            next(action)
            dispatch(fetchMessages(action.payload.active.id))
            break

        case (actionTypes.SET_ADMIN_EDIT_MODE):     // TODO: this not happend when getting into admin panel.
            next(action)
            const { groups: { isComplete: isGroupsComplete }, users: { isComplete: isUsersComplete } } = getState()
            isGroupsComplete || dispatch(fetchAllGroups())
            isUsersComplete || dispatch(fetchAllUsers())

        default: next(action)
    }
}
