export const updateObject = (oldObject: Object, updatedValues: Object) => {
    return {
        ...oldObject,
        ...updatedValues
    }
}
