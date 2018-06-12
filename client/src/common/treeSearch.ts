export default function treeSearch(data: any, predicate: Function): any[] {
    const results: any[] = []
    if (predicate(data)) {
        results.push(data)
    }
    if (Array.isArray(data)) {
        for (const obj of data) {
            const res = treeSearch(obj, predicate)
            Array.prototype.push.apply(results, res)
        }
    } else if (data.items) {
        const res = treeSearch(data.items, predicate)
        Array.prototype.push.apply(results, res)
    }
    return results
}
