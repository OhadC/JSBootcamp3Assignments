import Events from "../../../common/Events"
import { ITreeItem } from "../../../models"

export interface IItemHTMLElement extends HTMLElement {
    item: ITreeItem
    parentItem: ITreeItem | null
    firstChild: IItemHTMLElement | null
    previousSibling: IItemHTMLElement | null
    nextSibling: IItemHTMLElement | null
}

export default function ChatTree(element: IItemHTMLElement) {
    let activeElement: IItemHTMLElement | null
    let activeElementId: string | null
    let events = Events()
    let expandedGroups: string[] = []

    const onClick = (event: MouseEvent) => {
        event.stopPropagation()
        const srcElement = event.srcElement as IItemHTMLElement
        if (srcElement.localName === 'li') {
            setActiveElement(srcElement)
        }
    }
    const ondblclick = (event: MouseEvent) => {
        event.stopPropagation()
        const srcElement = event.srcElement as IItemHTMLElement
        if (srcElement.localName === 'li' && isGroup(srcElement)) {
            toggleGroup(srcElement)
        }
    }

    const onkeydown = (event: KeyboardEvent) => {
        event.stopPropagation()
        if (!activeElement) return
        switch (event.key) {
            case 'ArrowUp':
                if (activeElement.previousSibling) setActiveElement(activeElement.previousSibling)
                break
            case 'ArrowDown':
                if (activeElement.nextSibling) setActiveElement(activeElement.nextSibling)
                break
            case 'ArrowRight':
                if (isGroup(activeElement)) expandGroup(activeElement)
                break
            case 'ArrowLeft':
                if (isGroup(activeElement) && isGroupExpanded(activeElement)) {
                    foldGroup(activeElement)
                } else {
                    const parentGroup = getGroupOfElement(activeElement)
                    setActiveElement(parentGroup || element.firstChild)
                }
                break
            case 'Enter':
                if (isGroup(activeElement)) toggleGroup(activeElement)
                break
        }
    }

    function setActiveElement(toActiveElement: IItemHTMLElement | null) {
        if (!toActiveElement || activeElement === toActiveElement) return
        activeElement && activeElement.classList.remove("active")
        toActiveElement.classList.add("active")
        activeElement = toActiveElement
        activeElementId = toActiveElement.item.group.id

        events.emit('activeElementChanged', [activeElement])
    }

    function toggleGroup(groupElement: IItemHTMLElement) {
        if (isGroupExpanded(groupElement)) {
            foldGroup(groupElement)
        } else {
            expandGroup(groupElement)
        }
    }
    function expandGroup(groupElement: IItemHTMLElement) {
        if (isGroupExpanded(groupElement)) return
        const groupItem = groupElement.item
        const groupLevel = +(groupElement.dataset.level || 0)
        const addListItemsBefore = groupElement.nextSibling
        groupItem.items && groupItem.items.forEach((item: ITreeItem, index: number) => addListItem(item, groupItem, groupLevel + 1, addListItemsBefore))
        setGroupExpanded(groupElement, true, groupItem)
    }
    function foldGroup(groupElement: IItemHTMLElement) {
        if (!isGroupExpanded(groupElement)) return
        let currElement: IItemHTMLElement | null = groupElement.nextSibling
        while (currElement && isGroupOf(groupElement, currElement)) {
            if (isGroup(currElement) && isGroupExpanded(currElement)) {
                foldGroup(currElement)
            } else {
                const nextElement = currElement.nextSibling
                element.removeChild(currElement)
                currElement = nextElement
            }
        }
        setGroupExpanded(groupElement, false)
    }

    function addListItem(item: ITreeItem, parent: ITreeItem | null, level?: number, addBefore?: IItemHTMLElement | null) {
        level = level || 0

        const li: any = document.createElement("li")
        const textNode = document.createTextNode(item.name)
        li.appendChild(textNode)
        li.setAttribute('style', `padding-left: ${(level + 1) * 1}em`)
        li.dataset.level = level + ""
        if (item.type === 'group') {
            li.setAttribute('group', '')
        }

        li.item = item
        li.parentItem = parent

        element.insertBefore(li, addBefore || null)

        if (activeElementId === item.group.id) setActiveElement(li)
        if (expandedGroups.indexOf(item.group.id) !== -1) expandGroup(li)
    }

    function isGroup(elem: IItemHTMLElement) {
        return elem && elem.hasAttribute('group')
    }
    function isGroupExpanded(groupElem: IItemHTMLElement) {
        return groupElem.hasAttribute('expanded')
    }
    function setGroupExpanded(groupElem: IItemHTMLElement, isExpanded: boolean, groupItem?: ITreeItem) {
        const groupId: string = (groupItem || groupElem.item).group.id
        if (isExpanded) {
            groupElem.setAttribute('expanded', '')
            if (expandedGroups.indexOf(groupId) === -1) {
                expandedGroups.push(groupId)
                events.emit('groupExpanded', [groupId, expandedGroups])
            }
        } else {
            groupElem.removeAttribute('expanded')
            const indexToRemove = expandedGroups.indexOf(groupId)
            if (indexToRemove !== -1) {
                expandedGroups.splice(indexToRemove, 1)
                events.emit('groupFolded', [groupId, expandedGroups])
            }
        }
    }
    function isGroupOf(groupElem: IItemHTMLElement, childElem: IItemHTMLElement) {
        return groupElem.item === childElem.parentItem
    }
    function getGroupOfElement(childElement: IItemHTMLElement) {
        const parentItem = childElement.parentItem
        for (let currSibling = childElement.previousSibling; currSibling; currSibling = currSibling.previousSibling) {
            if (currSibling.item === parentItem) {
                return currSibling
            }
        }
        return null
    }

    function load(items: ITreeItem[], groupsToExpand: string[] = [], activeItemId?: string) {
        expandedGroups = groupsToExpand.slice()
        activeElementId = activeItemId || null
        clear()
        items.forEach((item: ITreeItem) => addListItem(item, null))

        if (!activeElement) setActiveElement(element.firstChild)

        element.addEventListener("click", onClick)
        element.addEventListener("dblclick", ondblclick)
        element.addEventListener("keydown", onkeydown)
    }
    function clear() {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
        
        activeElement = null

        element.removeEventListener("click", onClick)
        element.removeEventListener("dblclick", ondblclick)
        element.removeEventListener("keydown", onkeydown)
    }

    const on: (name: string, listener: Function) => void = events.on
    const off: (name: string, listener: Function) => void = events.off

    return {
        load,
        clear,
        element,
        on,
        off
    }
}
