import axios, * as Axios from "axios"

const baseURL = 'http://localhost:4000'

interface apiRequest {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    data?: any
    token?: string
}

export const apiRequest = ({ url, method, data, token }: apiRequest) => {
    const config: Axios.AxiosRequestConfig = {
        method: method ? method : 'GET',
        baseURL,
        url,
        data,
        headers: token ? {
            authorization: `Bearer ${token}`
        } : undefined
    }

    return axios(config)
        .then((response: Axios.AxiosResponse<any>) => response.data)
}
