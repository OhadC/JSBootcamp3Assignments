import { AnyAction } from "../../../node_modules/redux";

export const checkTypeAndStatus = (actionType: string, status: string) =>
    (action: AnyAction) =>
        action.type === actionType && action.status === status
