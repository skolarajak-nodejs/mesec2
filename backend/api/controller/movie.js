let movies = [
  { id: 1, name: 'John Wick', year: 2014 },
  { id: 2, name: 'Avengers EndGame', year: 2019 },
  { id: 3, name: 'Aquaman', year: 2018 }
]

exports.getAll = (req, res) => {
    return res.status(200).json(movies)
  }

  exports.get = (req, res) => {
    const id = req.params.id
    const movie = movies.filter(movie => movie.id === parseInt(id, 10))
  
    return res.status(200).json(movie)
  }

exports.create = (req, res) => {
  movies.push(req.body.movie)
  return res.status(200).json(movies)
}

exports.delete = (req, res) => {
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
}

exports.update = (req, res) => {
  const id = req.params.id
  let bodyMovie = req.body
  bodyMovie.id = id
  movies.filter(movie => {
    if (movie.id === parseInt(id, 10)) {
      movies[movies.indexOf(movie)] = bodyMovie
      return res.status(200).json(movies)
    }
  })
}