import { actionTypes } from ".";

interface apiRequest {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: any
    success?: any
    label?: any
}

export const apiRequest = ({ url, method, data, success, label }: apiRequest) => ({
    type: actionTypes.API_REQUEST,
    payload: {
        url,
        method,
        data,
        success,
        label
    }
})
