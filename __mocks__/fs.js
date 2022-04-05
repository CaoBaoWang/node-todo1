const fs =  jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')
Object.assign(fs, _fs)
const mocks = {}
fs.setReadMock = (path, error, data) => {
    mocks[path] = [error, data]
}

fs.readFile = (path, options , callback) => {
    if(callback === undefined) {
        callback = options
    }

    if(path in mocks) {
        callback(...mocks[path])
    }else {
        _fs.readFile(path, options , callback)

    }
}

const writeMocks = {}

fs.setWriteMock = (file,fn) => {
    writeMocks[file] = fn;
}

fs.writeFile = (file,data ,option, callback) =>{
    if(callback === undefined) callback  = option
    const fn = writeMocks[file];
    if(fn instanceof Function) {
        fn(file,data ,option, callback)
    }

}

module.exports  = fs
