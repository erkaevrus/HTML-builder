const fs = require('fs')
const path = require('path')

const PATH = path.join(__dirname, 'secret-folder/')

fs.readdir(PATH, {withFileTypes: true},  (err, files) => {
  if (err) throw err
  
  for (let file of files) {
    if (file.isFile()) {
      fs.stat(PATH + file.name, (err, stats) => {
        if (err) throw err
        console.log(`${(file.name).slice(0, file.name.indexOf('.'))} - ${path.extname(PATH + file.name).slice(1)} - ${stats.size} bites`)
      })
    }
  }
})
