import axios, * as Axios from "axios"
import { AnyAction } from "redux"

import { actionTypes } from "../actions"

const baseURL = 'http://localhost:4000'

const notify = (status: 'start' | 'success' | 'fail', label: string, data?: any) => {
    const type = toUnderscore(label) + "_" + toUnderscore(status)
    const payload = data
    return {
        type,
        payload
    }

    function toUnderscore(str: string) {
        return str.replace(/(?:^|\.?)([A-Z])/g, function (x, y) { return "_" + y.toLowerCase() }).replace(/^_/, "").toUpperCase()
    }
}

export const api = ({ dispatch, getState }: any) => (next: any) => (action: AnyAction) => {
    if (action.type !== actionTypes.API_REQUEST) {
        return next(action)
    }
    const { auth: { token } } = getState()
    const { url, method, data, success, fail, label } = action.payload

    const config: Axios.AxiosRequestConfig = {
        method: method ? method : 'get',
        baseURL,
        url,
        data,
        headers: token ? {
            authorization: `Bearer ${token}`
        } : undefined
    }

    label && dispatch(notify('start', label))
    axios(config)
        .then((response: Axios.AxiosResponse<any>) => response.data)
        .then(({ data }: any) => {
            success && success(data)
            label && dispatch(notify('success', label, data))
        })
        .catch((response: any) => {
            console.log(response)
            fail && fail(response)
            label && dispatch(notify('fail', label, response.data.message)) // TODO: no label
        })
}
