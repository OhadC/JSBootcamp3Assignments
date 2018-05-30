import axios, * as Axios from 'axios'

const cancelTokens: { [tokenName: string]: Axios.Canceler } = {}

export const getCancelObj = (tokenName: string) => {
    return {
        cancelToken: new axios.CancelToken((canceler: Axios.Canceler) => {
            if (cancelTokens[tokenName]) {
                cancelTokens[tokenName]('Request cancelled: ' + tokenName)
            }
            cancelTokens[tokenName] = canceler
        })
    }
}

export const catchError = (error: any) => {
    if (axios.isCancel(error)) {
        console.log(error.message ? error.message : 'Request cancelled');
    } else {
        throw error
    }
}
