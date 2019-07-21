const mongoose = require('mongoose')
const Movie = require('../models/movie')

exports.getAll = async (req, res) => {
  try {
    const docs = await Movie.find().exec()
    const result = {
      count: docs.length,
      movies: docs.map(doc => ({
        _id: doc._id,
        name: doc.name,
        image: doc.image,
        tickets: doc.tickets,
        year: new Date(doc.year).getFullYear(),
        request: {
          type: 'GET',
          url: `http://localhost:8080/api/v1/movies/${doc._id}`
        }
      }))
    }
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

exports.get = async (req, res) => {
  const id = req.params.id
  if (!id) {
    return res.status(422).json({ message: 'Please provide an id' })
  }
  try {
    const result = await Movie.findById(id)
      .select('_id name year image')
      .exec()
    if (result) {
      return res.status(200).json({
        movie: result,
        request: {
          type: 'GET',
          description: 'Get all movies',
          url: 'http://localhost:8080/api/v1/movies'
        }
      })
    }
    return res.status(404).json({ message: 'No valid movies found' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

exports.create = async (req, res) => {
  const movie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    year: req.body.year,
    image: req.body.image,
    tickets: [{ price: req.body.price, date: req.body.date }]
  })
  try {
    const result = await movie.save()
    return res.status(201).json({
      message: 'Created a movie',
      createdMovie: {
        name: result.name,
        year: result.year,
        image: result.image,
        _id: result.id,
        request: {
          type: 'GET',
          url: `http://localhost:8080/api/v1/movies/${result._id}`
        }
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(422).json({ message: 'Please provide an id' })
  }
  try {
    const result = await Movie.remove({ _id: id }).exec()
    return res.status(200).json({
      message: 'Movie deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:8080/api/v1/movies',
        data: { name: 'String', year: 'Number', image: 'String' }
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

exports.update = async (req, res) => {
  const id = req.params.id

  if (!id) {
    return res.status(422).json({ message: 'Please provide an id' })
  }

  const updateOpts = {}
  for (const ops of Object.keys(req.body)) {
    updateOpts[ops] = req.body[ops]
  }
  try {
    const result = await Movie.update({ _id: id }, { $set: updateOpts }).exec()
    return res.status(200).json({
      message: 'Movie updated',
      request: {
        type: 'GET',
        url: `http://localhost:8080/movies/${id}`
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
