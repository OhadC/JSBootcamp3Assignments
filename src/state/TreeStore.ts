import axios, * as Axios from 'axios'

import { AppStore, appState } from "./StateStore"
import { ITreeItem } from "../models/tree-item"
import { getCancelObj, catchError } from '../common/axios';

interface ITreeState extends Array<ITreeItem> {
}

const treeInitialState: ITreeState = []

class TreeReducer {
    static fetchTree(callback?: Function) {
        if (!appState.auth.isAuthenticated) return
        axios('./mock-data/tree.json', getCancelObj('fetchTree'))
            .then((data: Axios.AxiosResponse<ITreeState>) => data.data)
            .then((tree: ITreeState) => {
                AppStore.setState({ tree }, callback)
            })
            .catch(catchError)
        }
    }

export { ITreeState, treeInitialState, TreeReducer }
