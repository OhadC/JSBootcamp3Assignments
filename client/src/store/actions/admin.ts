// import { AnyAction } from "redux"

// import { actionTypes } from "."
import * as actions from '../../store/actions'
import { IClientUser } from "../../models";

export const deleteUser = (user: IClientUser) => (dispatch: any, getState: Function) => {
    const success = () => {
        const { items } = getState().tree
        const userIndex = (items as IClientUser[]).findIndex(item => item.id === user.id)
        const newItems = items.slice()
        newItems.splice(userIndex, 1)
        dispatch(actions.updateTreeItems(newItems))
    }
    dispatch(actions.apiRequest({
        url: `/user/${user.id}`,
        method: 'DELETE',
        success
    }))
}
