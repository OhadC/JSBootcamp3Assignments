import { actionTypes } from '../../store/actions'

export const startLoading = () => ({
    type: actionTypes.START_LOADING
})

export const finishLoading = () => ({
    type: actionTypes.FINISH_LOADING
})
