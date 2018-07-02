import { AnyAction } from "redux"

interface IHandler<T> {
    [key: string]: (state: T, action: AnyAction) => T
}

export const createReducer = <T>(initialState: T, handlers: IHandler<T>) => (state: T = initialState, action: AnyAction): T => {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
    } else {
        return state
    }
}

export const updateObject = <T>(oldObject: T, newValues: any): T => {
    return Object.assign({}, oldObject, newValues)
}
