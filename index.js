const homedir = require('os').homedir();
const home = process.env.HOME || homedir
const p = require('path')
const fs = require('fs')
const dbpath = p.join(home, '.todo')


module.exports.add = (title) => {
    fs.readFile(dbpath, {flag: 'a+'}, (error, data) => {
        if(error){
            console.log(error)
        }else {
            let list
            try {
                 list = JSON.parse(data)

            }catch (error2){
                list = []
            }
            console.log(list)
            const task = {
                title,
                done:false
            }
            list.push(task)
            const str = JSON.stringify(list)
            fs.writeFile(dbpath,str,(error3)=>{
                if(error3)console.log(error3)
            })
        }
    })
}
