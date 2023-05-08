const fs = require('fs')
const path = require('path')
const { stdout } = require('process')


let pathFrom = path.join(__dirname, 'assets')
let pathTo = path.join(__dirname, 'project-dist', 'assets')


fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
  if (err) throw err
})

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
  if (err) throw err
})


function copyDir(pathFrom, pathTo) {
  fs.readdir(pathFrom, {withFileTypes: true}, (err, files) => {
    if (err) throw err

    for (let file of files) {
      if (file.isFile()) {
        fs.copyFile(path.join(pathFrom, `/${file.name}`), path.join(pathTo, `/${(file.name)}`), err => {
          if (err) throw err
        })
      } else {
        fs.mkdir(path.join(pathTo, file.name), { recursive: true }, err => {
          if (err) throw err
        })
        copyDir(path.join(pathFrom, file.name), path.join(pathTo, file.name))
      }
    }
  })
}

copyDir(pathFrom, pathTo)


const PATH_TO_STYLES = path.join(__dirname, 'styles/')
const PATH_TO_BUNDLE = path.join(__dirname, 'project-dist', 'style.css')
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


//сборка index.html
const PATH_TO_COMPONENTS = path.join(__dirname, 'components')
const PATH_TO_TEMPLATE = path.join(__dirname, 'template.html' )
const PATH_TO_HTML = path.join(__dirname, 'project-dist', 'index.html')
let dataHTML


fs.writeFile(PATH_TO_HTML, '', (err) => {
  if (err) throw err
})

const readableStream = fs.createReadStream(PATH_TO_TEMPLATE, 'utf-8')
readableStream.on('data', data => {
  dataHTML = data.toString()

  fs.readdir(PATH_TO_COMPONENTS, {withFileTypes: true},  (err, files) => {
    if (err) throw err

    for (let file of files) {
      if (file.isFile() && path.extname(PATH_TO_COMPONENTS + file.name) ===".html") {

        const readableStream = fs.createReadStream(path.join(PATH_TO_COMPONENTS, file.name), 'utf-8')
        readableStream.on('data', component => {
          dataHTML = dataHTML.replace(`{{${file.name.split('.')[0]}}}`, component)
          fs.createWriteStream(PATH_TO_HTML).write(dataHTML)
        })
      }
    }
  })
})
