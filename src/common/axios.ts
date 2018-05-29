import axios, * as Axios from 'axios'

const cancelTokens: { [tokenName: string]: Axios.Canceler } = {}

export const getCancelObj = (tokenName: string) => {
    return {
        cancelToken: new axios.CancelToken((canceler: Axios.Canceler) => {
            if (cancelTokens['changeLocation']) {
                cancelTokens['changeLocation']()
            }
            cancelTokens['changeLocation'] = canceler
        })
    }
}

export const catchError = (thrown: any) => {
    if (axios.isCancel(thrown)) {
        console.log('request cancelled');
    } else {
        console.log('some other reason');
    }
}
