const express = require('express')
const multer = require('multer')
const checkAuth = require('../middlware/checkAuth')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
})

const movieController = require('../controller/movie')

router.get('/', movieController.getAll)

router.get('/:id', movieController.get)

router.post('/', checkAuth, upload.single('image'), movieController.create)

router.delete('/:id', checkAuth, movieController.delete)

router.put('/:id', checkAuth, movieController.update)

module.exports = router
