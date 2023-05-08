const fs = require('fs')
const path = require('path')
const { stdout } = require('process')

const PATH = path.join(__dirname, 'text.txt')
let data = ''
const readableStream = fs.createReadStream(PATH, 'utf-8')

readableStream.on('data', chunk => data += chunk)
readableStream.on('end', () => stdout.write(data))
readableStream.on('error', error => console.log('Error', error.message))
