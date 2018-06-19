import * as util from 'util'
import * as fs from 'fs'

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class DB {
    private db: { [key: string]: Object[] } = {}

    constructor() { }

    async find(dbName: string, conditions?: Object): Promise<any[]> {
        if (!(dbName in this.db)) {
            await this.fetchDb(dbName)
        }
        if (!conditions) {
            return this.db[dbName]
        }
        return this.db[dbName].filter(dict => this.isMatching(dict, conditions))
    }

    async findOne(dbName: string, conditions: Object): Promise<Object> {
        if (!(dbName in this.db)) {
            await this.fetchDb(dbName)
        }
        const index = this.db[dbName].findIndex(dict => this.isMatching(dict, conditions))
        if (index !== -1) {
            return this.db[dbName][index]
        }
        return null
    }

    async add(dbName: string, dict: Object) {
        if (!(dbName in this.db)) {
            await this.fetchDb(dbName)
        }

        const newId = Date.now() + "" // good enouth for now. mongoDB will fix that
        dict['id'] = newId
        this.db[dbName].push(dict)
        await this.writeToJson(dbName)
        return dict
    }

    async update(dbName: string, conditions: Object, updatedDict: Object) {
        if (!(dbName in this.db)) {
            await this.fetchDb(dbName)
        }

        const index = this.db[dbName].findIndex(dict => this.isMatching(dict, conditions))
        if (index !== -1) {
            this.db[dbName][index] = updatedDict
            return { success: true }
        } else {
            return { error: 'No matching' }
        }
    }

    async delete(dbName: string, conditions: Object) {
        if (!(dbName in this.db)) {
            await this.fetchDb(dbName)
        }

        this.db[dbName] = this.db[dbName].filter(dict => !this.isMatching(dict, conditions))
        this.writeToJson(dbName)
        return { success: true }
    }

    private async fetchDb(dbName: string): Promise<void> {
        this.db[dbName] = await this.readFromJson(dbName)
    }

    private isMatching(dict, conditions) {
        for (const key in conditions) {
            if (!(key in dict)) return false
            if (dict[key] !== conditions[key]) return false
        }
        return true
    }

    private async readFromJson(name: string) {
        const text = await readFileAsync(`./mock-data/${name}.json`, 'utf8')
        return JSON.parse(text)
    }
    private async writeToJson(name: string) {
        writeFileAsync(`./mock-data/${name}.json`, JSON.stringify(this.db[name]));
    }
}

export default new DB()
