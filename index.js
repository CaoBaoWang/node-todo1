const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async (title) => {

    const list = await db.read()
    list.push({title, done: false})
    await db.write(list);
}

module.exports.clear = async (title) => {
    await db.write([])
}

module.exports.showAll = async () => {
    const list = await db.read()

    showAllChoice(list)
        .then(answer => {
            const index = parseInt(answer.index)
            if (index >= 0) {
                // 展示所有操作
                showAllAction(list, index)
            } else if (index === -2) {
                // 创建任务
                createTask(list);
            }
        })
}

function createTask(list) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '输入任务标题',
    }).then((answer => {
        list.push({
            title: answer.title,
            done: false
        })
        db.write(list)
    }))
}

function remove(list, index) {
    list.splice(index, 1)
    db.write(list).then()
}

function updateTitle(list, index) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '新的标题',
        default: list[index].title
    }).then((answer => {
        list[index].title = answer.title
        db.write(list).then()
    }))
}

function markAsUndone(list, index) {
    list[index].done = false
    db.write(list).then()
}

function markAsDone(list, index) {
    list[index].done = true
    db.write(list).then()
}

function showAllAction(list, index) {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: '请选择操作',
        choices: [
            {name: '退出', value: 'quit'},
            {name: '已完成', value: 'markAsDone'},
            {name: '未完成', value: 'markAsUndone'},
            {name: '改标题', value: 'updateTitle'},
            {name: '删除', value: 'remove'},
        ]
    }).then(answer => {
        const hash = {
            quit: undefined,
            markAsDone,
            markAsUndone,
            updateTitle,
            remove
        }
        const fn = hash[answer.action];
        if (fn) fn(list, index)
    })

}

function showAllChoice(list) {
    return inquirer
        .prompt({
            type: 'list',
            name: 'index',
            message: '请选择完成的任务',
            choices: [{name: '退出', value: '-1'}, ...list.map((task, index) => {
                return {
                    name: `${task.done ? '[x]' : '[_]'}   ${index} - ${task.title}`,
                    value: index
                }
            }), {name: '创建任务', value: '-2'}]
        })
}
