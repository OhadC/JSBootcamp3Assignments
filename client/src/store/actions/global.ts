import axios from "axios"
import { Dispatch } from "redux"

import { IGroup } from "../../models"
import { actionTypes } from "."

export const setActiveGroup = (group: IGroup) => ({
    type: actionTypes.SET_ACTIVE_GROUP,
    payload: { group }
})

export const setActiveGroupId = (groupId: string) => (dispatch: Dispatch) => {
    const url = `http://localhost:4000/group/${groupId}`
    axios.get(url)
        .then(response => {
            const group = response.data
            dispatch(setActiveGroup(group))
        })
}
