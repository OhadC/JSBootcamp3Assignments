export default function searchIterator(data: any, predicate: Function): any {
    return helper.bind(null, data)
    
    function* helper(data: any): any {
        console.log('helper', data)
        if (Array.isArray(data)) {
            console.log('Array.isArray', data)
            for (const obj of data) {
                yield* helper(data[obj])
            }
        }
        if (predicate(data)) {
            console.log('predicate', data)
            yield data
        }
        for (const key in data) {
            console.log('const key in data', data)
            if (key in data) {
                yield* helper(data[key])
            }
        }
    }
}
