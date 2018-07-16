import { AnyAction } from "redux"

export const checkTypeAndStatus = (actionType: string, status: string) =>
    (action: AnyAction) =>
        action.type === actionType && action.status === status
