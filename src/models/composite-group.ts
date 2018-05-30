import { Group, IGroup } from './group'
import { User, IUser } from './user';

export interface ICompositeGroup extends IGroup {
    parent: ICompositeGroup | null
    groups: { [key: string]: ICompositeGroup }
    usersCount: number

    getParent?(): ICompositeGroup | null
    getGroups?(): ICompositeGroup[]
    getGroupsKeys?(): string[]
    updateUsersCount?(): void
    addUser?(user: IUser): boolean
    getGroup?(key: string): ICompositeGroup | null
    addGroup?(newGroup: ICompositeGroup): boolean
    removeGroup?(key: string): boolean
    getPath?(innerPath: ICompositeGroup[]): ICompositeGroup[]
    DFS?(doToEveryGroup: Function): void
    search?(predicate: (group: ICompositeGroup) => boolean): ICompositeGroup[]
    flattening?(): void
    toString?(): string
    removeUserFromAllGroups?(username: string): void
    preventTwoEntities?(): void
}

export class CompositeGroup extends Group implements ICompositeGroup {
    parent: CompositeGroup | null
    groups: { [key: string]: CompositeGroup }
    usersCount: number

    constructor(id: string, name: string, parent: CompositeGroup) {
        super(id, name)
        this.parent = parent || null
        this.groups = {}
        this.usersCount = 0
    }

    getParent(): CompositeGroup | null {
        return this.parent
    }
    getGroups(): CompositeGroup[] {
        return Object.keys(this.groups).map(key => this.groups[key])
    }
    getGroupsKeys(): string[] {
        return Object.keys(this.groups)
    }
    getUsersCount() {
        return this.usersCount
    }
    updateUsersCount(): void {
        this.usersCount = this.getGroups().reduce((sum: number, group: CompositeGroup) => {
            group.updateUsersCount()
            return sum + group.getUsersCount()
        }, 0) + Object.keys(this.users).length
    }
    addUser(user: User): boolean {
        if (this.users[user.getName()]) return false
        this.users[user.getName()] = user
        this.preventTwoEntities()
        return true
    }

    getGroup(key: string): CompositeGroup | null {
        if (!(key in this.groups)) {
            return null
        }
        return this.groups[key]
    }
    addGroup(newGroup: CompositeGroup): boolean {
        const groupName = newGroup.getName()
        if (groupName in this.groups) {
            return false
        }
        this.groups[groupName] = newGroup
        this.preventTwoEntities()
        return true
    }
    removeGroup(key: string): boolean {
        if (!(key in this.groups)) {
            return false
        }
        delete this.groups[key]
        return true
    }

    getPath(innerPath: CompositeGroup[]): CompositeGroup[] {
        innerPath = innerPath || []
        innerPath.unshift(this)
        if (this.parent) {
            return this.parent.getPath(innerPath) // tail recursion
        } else {
            return innerPath
        }
    }
    DFS(doToEveryGroup: Function): void {
        const groups = [this]
        while (groups.length > 0) {
            const currGroup: any = groups.pop()
            doToEveryGroup(currGroup)
            groups.push(currGroup.getGroups())
        }
    }
    search(predicate: (group: CompositeGroup) => boolean): CompositeGroup[] {
        const foundedGroups: CompositeGroup[] = []
        if (predicate(this)) {
            foundedGroups.push(this)
        }
        Object.keys(this.groups).forEach(key => {
            const result = this.groups[key].search(predicate)
            foundedGroups.push(...result)
        })
        return foundedGroups
    }

    flattening(): void {  // should be in reverse, delete also empty groups
        if (Object.keys(this.groups).length === 1) {
            const childKey = Object.keys(this.groups)[0]
            const childUsers = this.groups[childKey].getUsers()
            const childGroups = this.groups[childKey].getGroups()

            this.removeGroup(childKey)
            this.addUsers(childUsers)
            childGroups.forEach((group: CompositeGroup) => this.groups[group.getName()] = group)

            this.flattening()
        }
        Object.keys(this.groups).forEach(key => {
            this.groups[key].flattening()
        })
    }
    toString(): string {
        return this.name + " (" + this.usersCount + ")"
    }

    removeUserFromAllGroups(username: string): void { // TODO: should be userId
        super.removeUser(username)
        this.getGroups().forEach((group: CompositeGroup) => group.removeUserFromAllGroups(username))
    }
    preventTwoEntities(): void {
        const groupsKeys = this.getGroupsKeys()
        if (groupsKeys.length) {
            const users = this.getUsers()
            if (users.length) {
                let othersGroup: CompositeGroup | null = this.getGroup('others')
                if (!othersGroup) {
                    othersGroup = new CompositeGroup('others', 'others', this)
                    this.addGroup(othersGroup)
                }
                othersGroup.addUsers(users)
                this.removeAllUsers()
                console.log('User/s moved to group "others"')
            }
        }
    }
}
