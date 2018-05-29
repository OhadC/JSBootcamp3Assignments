import { AppStore, appState } from "./StateStore"
import { ITreeItem } from "../models/tree-item"

interface ITreeState extends Array<ITreeItem> {
}

const treeInitialState: ITreeState = []

class TreeReducer {
    static fetchTree(callback?: Function) {
        if(!appState.auth.isAuthenticated) return
        fetch('./mock-data/tree.json')
            .then(res => res.json())
            .then((tree: ITreeState) => {
                AppStore.setState({ tree }, callback)
            })
    }
}

export { ITreeState, treeInitialState, TreeReducer }
