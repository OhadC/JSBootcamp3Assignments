import { IAppState } from "../reducers"
import { createSelector } from "../../../node_modules/reselect"

export const tokenSelector = (state: IAppState) => state.auth.token

export const isAuthenticatedSelector = createSelector(
    tokenSelector,
    (token: string | null) => !!token
)
