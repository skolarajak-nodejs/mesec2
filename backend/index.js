const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))
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

let movies = [
  { id: 1, name: 'John Wick', year: 2014 },
  { id: 2, name: 'Avengers EndGame', year: 2019 },
  { id: 3, name: 'Aquaman', year: 2018 }
]

app.get('/', (req, res) => {
  return res.status(200).json({ hello: 'World' })
})

app.get('/movies', (req, res) => {
  return res.status(200).json(movies)
})

app.get('/movies/:id', (req, res) => {
  const id = req.params.id
  const movie = movies.filter(movie => movie.id === parseInt(id, 10))

  return res.status(200).json(movie)
})

app.post('/movies', (req, res) => {
  movies.push(req.body.movie)
  return res.status(200).json(movies)
})

app.delete('/movies/:id', (req, res) => {
  const id = req.params.id
  const deleted = movies.filter(movie => {
    if (movie.id === parseInt(id, 10)) {
      movies.splice(movies.indexOf(movie), 1)
      return movie
    }
  })

  if (deleted[0]) {
    return res
      .status(200)
      .json({ message: `Deleted ${deleted[0].name} with id ${deleted[0].id}` })
  }
  return res.status(422).json({ message: 'Could not delete that movie.' })
})

app.put('/movies/:id', (req, res) => {
  const id = req.params.id
  let bodyMovie = req.body
  bodyMovie.id = id
  movies.filter(movie => {
    if (movie.id === parseInt(id, 10)) {
      movies[movies.indexOf(movie)] = bodyMovie
      return res.status(200).json(movies)
    }
  })
})

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
