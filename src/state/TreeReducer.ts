import axios, * as Axios from 'axios'

import * as AppStore from "./StateStore"
import * as MessagesReducer from './MessagesReducer'
import { ITreeState } from './TreeStore'
import { getCancelObj, catchError } from '../common/axios'
import { ITreeItem } from '../models/tree-item'

export const fetchTree = (callback?: Function) => {
    if (!AppStore.appState.auth.isAuthenticated) return
    axios.get('./mock-data/tree.json', getCancelObj('fetchTree'))
        .then((data: Axios.AxiosResponse<ITreeState>) => data.data)
        .then((treeData: ITreeState) => {
            AppStore.setState((prevState: AppStore.IAppState) => {
                return {
                    tree: {
                        ...prevState.tree,
                        treeData
                    }
                }
            })
        })
        .catch(catchError)
}

export const setActiveItem = (item: ITreeItem, callback?: Function) => {
    const newCallback = () => {
        MessagesReducer.fetchMessages(item.conversationId)
        if(callback) callback
    }
    AppStore.setState((prevState: AppStore.IAppState) => {
        return {
            tree: {
                ...prevState.tree,
                activeItem: item
            }
        }
    }, newCallback)
}
