import { IAppState } from '../reducers'

export const usersSelector = (state: IAppState) => state.users.data
