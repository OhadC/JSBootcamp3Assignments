import { actionTypes } from ".";

// TODO: delete

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

export const getStatus = (data: any, status?: string) => {
    if (status) {
        return status
    } else if (data) {
        return actionTypes.SUCCESS
    } else {
        return actionTypes.REQUEST
    }
}
