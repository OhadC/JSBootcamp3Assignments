export default function search(data: any, predicate: Function): any[] {
    const results: any[] = []
    if (predicate(data)) {
        results.push(data)
    }
    if (Array.isArray(data)) {
        for (const obj of data) {
            const res = search(obj, predicate)
            Array.prototype.push.apply(results, res)
        }
    } else if (data.items) {
        const res = search(data.items, predicate)
        Array.prototype.push.apply(results, res)
    }
    return results
}
