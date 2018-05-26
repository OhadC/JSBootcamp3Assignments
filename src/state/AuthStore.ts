import Events from "../common/Events"

interface IAuthState {
    user: any
    isAuthenticated: boolean
}

interface IAuthStore {
    state: IAuthState

    get(key: string): any | null
    set(key: string, val: any): void

    on(name: string, listener: Function): void
    off(name: string, listener: Function): void
    emit(name: string, args: object[]): void
}

class AuthStore implements IAuthStore {
    state: IAuthState = {
        user: null,
        isAuthenticated: false
    }
    events = Events()

    get(key: string) {
        return this.state[key] || null
    }
    set(key: string, val: any) {
        this.state[key] = val
    }

    on: (name: string, listener: Function) => void = this.events.on
    off: (name: string, listener: Function) => void = this.events.off
    emit: (name: string, args: object[]) => void = this.events.emit

    static instance: IAuthStore

    static getInstance() {
        if (!AuthStore.instance) {
            AuthStore.instance = new AuthStore()
        }

        return AuthStore.instance
    }
}

export { AuthStore, IAuthStore, IAuthState }
