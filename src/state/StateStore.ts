interface IState {
    
}

interface IStateStore {
    state: IState

    get(key: string): any | null
    set(key: string, val: any): void
}

class StateStore implements IStateStore {
    state: IState = {}

    get(key: string) {
        return this.state[key] || null
    }

    set(key: string, val: any) {
        this.state[key] = val
    }

    static instance: IStateStore

    static getInstance() {
        if (!StateStore.instance) {
            StateStore.instance = new StateStore()
        }

        return StateStore.instance
    }
}

export default StateStore
