const express = require('express')
const app = express()

// const Busboy = require('busboy')
// const fs = require('fs')
// const os = require('os')
// const path = require('path')

const formidable = require('formidable')

app.get('/', (req, res) => {
  res.send(
    '<html><head></head><body>\
        <form method="POST" enctype="multipart/form-data">\
         <input type="text" name="textfield"><br />\
         <input type="file" name="filefield"><br />\
         <input type="submit">\
       </form>\
     </body></html>'
  )
  res.end()
})


// app.post('/', (req, res) => {
//     const busboy = new Busboy({headers: req.headers})
//     busboy.on('file', (fieldname, file, filename, encoding, mimetype)=> {
//         const saveTo = path.join('.', filename)
//         console.log('Uploading to: ' + saveTo)
//         file.pipe(fs.createWriteStream(saveTo))
//     })
//     busboy.on('finish', ()=>{
//         console.log('Upload complete')
//         res.writeHead(200, {'Connection': 'close'})
//         res.end('That\'s all folks')
//     })

//     return req.pipe(busboy)
// })


app.post('/', (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req)

    form.on('fileBegin', (name, file) => {
        file.path = __dirname + '/uploads/' + file.name
    })

    form.on('file', (name, file) => {
        console.log('Uploaded: ' + file.name)
    })

    res.send('That\'s all')
})




app.listen(3000, () => console.log('app is running'))
