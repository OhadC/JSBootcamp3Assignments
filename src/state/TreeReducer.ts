import axios, * as Axios from 'axios'

import * as AppStore from "./StateStore"
import * as MessagesReducer from './MessagesReducer'
import { ITreeState } from './TreeStore'
import { getCancelObj, catchError } from '../common/axios'
import { ITreeItem } from '../models/tree-item'
import searchIterator from '../common/searchIterator';

export const fetchTree = (callback?: Function) => {
    if (!AppStore.appState.auth.isAuthenticated) return
    axios.get('./mock-data/tree.json', getCancelObj('fetchTree'))
        .then((response: Axios.AxiosResponse<ITreeState>) => {
            const treeData: ITreeState = response.data
            AppStore.setState((prevState: AppStore.IAppState) => {
                return {
                    tree: {
                        ...prevState.tree,
                        treeData,
                        filterdTreeData: treeData
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
    AppStore.setState((prevState: AppStore.IAppState) => {
        return {
            tree: {
                ...prevState.tree,
                activeItem: item
            }
        }
    }, newCallback)
}

export const filterData = (filterText: string, callback?: Function) => {
    AppStore.setState((prevState: AppStore.IAppState) => {
        const filterdTreeData: any[] = []
        console.info(searchIterator(prevState.tree.treeData, predicate))
        for (const item of searchIterator(prevState.tree.treeData, predicate)) {
            filterdTreeData.push(item)
        }
        return {
            tree: {
                ...prevState.tree,
                filterdTreeData
            }
        }
    }, callback)

    function predicate(item: ITreeItem) {
        return item instanceof Object && item.name.includes(filterText)
    }
}
