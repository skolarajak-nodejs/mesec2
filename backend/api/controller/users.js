const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const configuration = require('config')

const User = require('../models/user')

exports.signup = async (req, res, next) => {
    try {
        const doc = await User.find({email: req.body.email}).exec()
        if (doc.length >= 1) {
            return res.status(409).json({message: 'Email in use'})
        }
        bcrypt.hash(req.body.password, 10, async (error, hash) => {
            if (error) {
                return res.status(500).json({error})
            }
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            })
    
            try {
                const result = await user.save()
                return res.status(201).json({
                    message: 'User created'
                })
            } catch(error) {
                console.error(error)
                return res.status(500).json({error})
            }
        })
    } catch(error) {
        console.error(error) 
        return res.status(500).json({error})
    }
}

exports.login = async (req, res, next) => {
    try {
        const doc = await User.find({email: req.body.email}).exec()
    if (doc.length < 1) {
        return res.status(401).json({message: 'Auth failed'})
    }
    bcrypt.compare(req.body.password, doc[0].password, (error, result)=> {
        if (error) {
            return res.status(401).json({message: 'Auth failed'})
        }
        if(result) {
            const token = jwt.sign({
                email: doc[0].email,
                userId: doc[0]._id
            },
            configuration.SECRET, {
                expiresIn: '12h'
            })
            return res.status(200).json({
                message: 'Auth successful',
                token
            })
        }
        return res.status(401).json({message: 'Auth failed'})
    })
    } catch(error) {
        return res.status(500).json({error})
    }
    
}