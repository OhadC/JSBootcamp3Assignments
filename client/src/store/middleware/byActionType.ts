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
            const { tree: { itemsType } } = getState()
            itemsType === 'groups' && dispatch(fetchMessages(action.payload.active.id)) // TODO: only in messages! IDK how
            break

        case (actionTypes.SET_TREE_ITEMS_TYPE):
            next(action)
            dispatch(fetchTree(action.payload.itemsType))
            break

        default: next(action)
    }
}
