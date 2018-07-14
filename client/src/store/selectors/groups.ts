import { IAppState } from '../reducers'
import { createSelector } from '../../../node_modules/reselect';
import { IClientGroup } from '../../models';

export const groupsSelector = (state: IAppState) => state.groups.data

export const publicGroupsSelector = createSelector(
    groupsSelector,
    (groups: IClientGroup[]) => groups.filter(group => !group.isPrivate)
)
