import axios, * as Axios from 'axios'

import { StateStore, IAppState } from "./StateStore"
import * as MessagesReducer from './MessagesReducer'
import { ITreeState } from './TreeStore'
import { getCancelObj, catchError } from '../common/axios'
import { ITreeItem } from '../models/tree-item'
import treeSearch from '../common/treeSearch';

export const fetchTree = (callback?: Function) => {
    if (!StateStore.appState.auth.isAuthenticated) return
    axios.get('./mock-data/tree.json', getCancelObj('fetchTree'))
        .then((response: Axios.AxiosResponse<ITreeState>) => {
            const data: ITreeState = response.data
            StateStore.setState((prevState: IAppState) => {
                return {
                    tree: {
                        ...prevState.tree,
                        data,
                        filterdData: data
                    }
                }
            }, callback)
        })
        .catch(catchError)
}

export const setActiveItem = (item: ITreeItem, callback?: Function) => {
    const newCallback = () => {
        MessagesReducer.fetchMessages(item.conversationId)
        if (callback) callback
    }
    StateStore.setState((prevState: IAppState) => {
        return {
            tree: {
                ...prevState.tree,
                activeItem: item
            }
        }
    }, newCallback)
}

export const filterData = (filterText: string, callback?: Function) => {
    StateStore.setState((prevState: IAppState) => {
        if (filterText === prevState.tree.filterText) {
            return
        }
        const filterdData = filterText === '' ?
            prevState.tree.data :
            treeSearch(prevState.tree.data, predicate)
        return {
            tree: {
                ...prevState.tree,
                filterText,
                filterdData
            }
        }
    }, callback)

    function predicate(item: ITreeItem) {
        return item instanceof Object && item.name &&
            item.name.toLowerCase().includes(filterText.toLowerCase())
    }
}
