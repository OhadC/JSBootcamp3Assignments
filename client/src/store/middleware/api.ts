import { actionTypes } from "../actions";
import axios, * as Axios from "axios";

const baseURL = 'http://localhost:4000'

const notify = (status: 'start' | 'success' | 'fail', label: string, message?: string) => {
    const type = toUnderscore(label) + "_" + toUnderscore(status)
    const payload = message ? { message } : undefined
    return {
        type,
        payload
    }

    function toUnderscore(str: string) {
        return str.replace(/(?:^|\.?)([A-Z])/g, function (x, y) { return "_" + y.toLowerCase() }).replace(/^_/, "").toUpperCase()
    }
}

export const api = ({ dispatch, getState }: any) => (next: any) => (action: any) => {
    if (action.type !== actionTypes.API) {
        return next(action)
    }
    const { url, method, data, success, label } = action.payload

    const config: Axios.AxiosRequestConfig = {
        method: method ? method : 'get',
        baseURL,
        url,
        data
    }

    label && dispatch(notify('start', label))
    axios(config)
        .then((response: Axios.AxiosResponse<any>) => response.data)
        .then(data => {
            dispatch(success(data))
            label && dispatch(notify('success', label))
        })
        .catch(error => {
            label && dispatch(notify('fail', label, error.message))
        })
}
