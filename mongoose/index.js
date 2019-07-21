const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')
  req.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method == 'OPTIONS') {
    res.header(
      'Acess-Control-Allow-Methods',
      'PUT',
      'POST',
      'PATCH',
      'DELETE',
      'GET'
    )
    return res.status(200).json({})
  }
  next()
})

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

const Cat = mongoose.model('Cat', { name: String })
const kitty = new Cat({ name: 'Mauricijus' })


mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () =>{
    console.log('open')
})

kitty
  .save()
  .then((data) => console.log('Hi ', data))
  .catch(console.error)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    message: error.message
  })
})

const server = app.listen(8080, () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`Expresss is running at:http://${host}:${port}`)
})
