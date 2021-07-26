const fs =  jest.genMockFromModule('fs')

fs.x = () => {
    console.log('x')
    return 'xxx'
}
module.exports  = fs