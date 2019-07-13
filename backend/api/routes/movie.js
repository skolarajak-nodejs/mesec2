const express = require('express')
const multer = require('multer')

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
        fileSize: 1024  * 1024 * 5,
    },
    fileFilter
})

const movieController = require('../controller/movie')

router.get('/', movieController.getAll)

router.get('/:id', movieController.get)

router.post('/', upload.single('image'), movieController.create)

router.delete('/:id', movieController.delete)

router.put('/:id', movieController.update)

module.exports = router