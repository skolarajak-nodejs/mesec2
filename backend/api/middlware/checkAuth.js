const jwt = require('jsonwebtoken')
const configuration = require('config')

module.exports = (req, res, next) => {
    try {
        console.log(configuration)
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, configuration.SECRET)

        req.userData = decoded
        next()
    } catch(error) {
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
}