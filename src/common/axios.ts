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

export const catchError = (thrown: any) => {
    if (axios.isCancel(thrown)) {
        console.log(thrown.message ? thrown.message : 'Request cancelled');
    } else {
        console.log('some other reason');
    }
}
