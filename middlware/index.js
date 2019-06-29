const fs = require('fs')
const express = require('express')
const app = express()

const requestTime = (req, res, next) => {
  req.requestTime = Date.now()
  req.pera = 'Perić'
  next()
}

app.use(requestTime)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke')
})

// app.get('/', (req, res) => {
//   //   return res.send('Hello World')
//   throw new Error('BROKEN')
// })

// app.get('/', (req, res, next) => {
//   fs.readFile('/file-doesnt-exist', (err, data) => {
//     if (err) next(err)
//     res.send(data)
//   })
// })

app.get('/', [
  (req, res, next) => {
    fs.writeFile('data.txt', 'data', next)
  },
  (req, res) => {
    res.send('OK')
  }
])

const server = app.listen(8080, () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`Expresss is running at:http://${host}:${port}`)
})
