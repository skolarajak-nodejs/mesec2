const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

const app = express()

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
)

app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(3000, ()=> console.log('app is running'))