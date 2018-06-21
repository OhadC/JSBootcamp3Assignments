import { actionTypes } from ".";

export const apiRequest = ({ url, method, data, success, label }: any) => ({
    type: actionTypes.API_REQUEST,
    payload: {
        url,
        method,
        data,
        success,
        label
    }
})
