import { db } from '../models';

export const getTree = async () => {
    const groups = await db.find('group')
    const groupsMap = groups.reduce((obj, group) => {
        obj[group.id] = group
        return obj
    }, {})

    const treeRoots = groups.filter(group => group.parentId === null)
    return treeRoots.map(root => printTree(root, groupsMap))
}


function printTree(currGroup, groups) {
    const node = {
        groupId: currGroup.id,
        type: currGroup.isPrivate ? 'user' : 'group',
        name: currGroup.name ? currGroup.name : 'some user'
    }
    if ('groupsIds' in currGroup) {
        node['items'] = currGroup.groupsIds.map(groupId => printTree(groups[groupId], groups))
    }
    return node
}
