const mongoose = require('mongoose')

const tickeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    price: {type: Number, required: true},
    date: {type: Date, required: true}
})

const movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, index: true },
  year: { type: Date, required: true },
  image: { type: String, required: false },
  tickets: [tickeSchema]
})

movieSchema.index({name: 1, year: -1})


module.exports = mongoose.model('Movie', movieSchema)
