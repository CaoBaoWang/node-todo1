const homedir = require('os').homedir();
const home = process.env.HOME || homedir
const p = require('path')
const fs = require('fs')
const dbpath = p.join(home, '.todo')

const db = {
    read(path = dbpath) {
        return new Promise((resolve, reject) => {
            fs.readFile(dbpath, {flag: 'a+'}, (error, data) => {
                if (error)
                    return reject(error)
                let list
                try {
                    list = JSON.parse(data)
                } catch (error2) {
                    list = []
                }
                resolve(list)

            })
        })


    },
    write(list, path = dbpath) {
        new Promise((resolve, reject) => {
            const str = JSON.stringify(list)
            fs.writeFile(dbpath, str, (error) => {
                if (error)
                    return reject(error)
                else
                    resolve()
            })
        })


    }
}
module.exports = db
