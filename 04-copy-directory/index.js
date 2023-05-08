const fs = require('fs')
const path = require('path')


function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if (err) throw err
  })

  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) throw err
    for (let file of files) {
      fs.copyFile(path.join(__dirname, `files/${String(file)}`), path.join(__dirname, `files-copy/${String(file)}`), err => {
        if (err) throw err
      })
    }
  })
}

copyDir()
