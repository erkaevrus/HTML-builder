const fs = require('fs')
const path = require('path')
const { stdin, stdout, exit} = process

const PATH = path.join(__dirname, 'newFile.txt')

fs.writeFile(PATH, '', (err) => {
  if (err) throw err
})

stdout.write('Hello there! Enter your text please\n')
stdout.write('(Enter "exit" or press Ctr+C to exit)\n')

stdin.on('data', data => {
  if (data.toString().trimEnd() === 'exit') {
    stdout.write('Goodbye!')
    exit()
  }

  fs.appendFile(PATH, data, (err) => {
    if (err) throw err
  })
})


process.on('SIGINT', function() {
  stdout.write('Goodbye!')
  exit()
})
