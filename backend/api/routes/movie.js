const express = require('express')
const router = express.Router()


const movieController = require('../controller/movie')

router.get('/', movieController.getAll)

router.get('/:id', movieController.get)

router.post('/', movieController.create)

router.delete('/:id', movieController.delete)

router.put('/:id', movieController.update)

module.exports = router