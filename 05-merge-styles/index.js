const fs = require('fs')
const path = require('path')


const PATH_TO_STYLES = path.join(__dirname, 'styles/')
const PATH_TO_BUNDLE = path.join(__dirname, 'project-dist', 'bundle.css')
let data = ''


fs.writeFile(PATH_TO_BUNDLE, '', (err) => {
  if (err) throw err
})

fs.readdir(PATH_TO_STYLES, {withFileTypes: true},  (err, files) => {
  if (err) throw err

  for (let file of files) {
    if (file.isFile() && path.extname(PATH_TO_STYLES + file.name) ===".css") {

      const readableStream = fs.createReadStream(PATH_TO_STYLES + file.name, 'utf-8')
      readableStream.on('data', chunk => data += chunk)
      readableStream.on('end', () => fs.writeFile(PATH_TO_BUNDLE, data, err => {
        if (err) throw err
      }))
    }
  }
})
