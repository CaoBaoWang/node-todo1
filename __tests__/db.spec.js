const db = require('../db')
const fs = require('fs')
jest.mock('fs')

describe('db',()=> {
    it('can read',  async ()=>{
        const data = [{title: 'hi', done: true}]
        fs.setReadMock('/xxx',null,JSON.stringify(data))
        const list =  await db.read('/xxx')
        expect(list).toStrictEqual(data)
    })

    it('can write', async () =>{
        let fakeFile = '';
        const data = [{title: 'writeTest', done: true}];
        fs.setWriteMock('/yyy', (file, data, callback) => {
            fakeFile = data;
            callback(null)
        })
        await db.write(data,'/yyy')
        expect(fakeFile).toBe(JSON.stringify(data) + '\n')

    })
})

