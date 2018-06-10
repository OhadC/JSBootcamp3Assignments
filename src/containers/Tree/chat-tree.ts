import Events from "../../common/Events";
import { ITreeItem } from "../../models";

interface IItemHTMLElement extends HTMLElement {
    item: ITreeItem
    parentItem: ITreeItem | null
    firstChild: IItemHTMLElement | null
    previousSibling: IItemHTMLElement | null
    nextSibling: IItemHTMLElement | null
}

function ChatTree(element: IItemHTMLElement) {
    // let itemsArray: IItem[] | null
    let activeElement: IItemHTMLElement | null
    let events = Events()

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
        setGroupExpanded(groupElement, true)
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
    }

    function isGroup(elem: IItemHTMLElement) {
        return elem && elem.hasAttribute('group')
    }
    function isGroupExpanded(groupElem: IItemHTMLElement) {
        return groupElem.hasAttribute('expanded')
    }
    function setGroupExpanded(groupElem: IItemHTMLElement, isExpanded: boolean) {
        isExpanded ? groupElem.setAttribute('expanded', '') : groupElem.removeAttribute('expanded')
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

    function load(items: ITreeItem[]) {
        clear()
        // itemsArray = items
        items.forEach((item: ITreeItem) => addListItem(item, null))
        setActiveElement(element.firstChild)
        element.onclick = onClick
        element.ondblclick = ondblclick
        element.onkeydown = onkeydown
    }
    function clear() {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
        // itemsArray = null
        activeElement = null
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

export { ChatTree, IItemHTMLElement }
