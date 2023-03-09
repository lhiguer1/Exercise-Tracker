const { default: mongoose } = require('mongoose');
const { User } = require('../models')


module.exports = {
    /** CRUD */
    /** @type {import('express').RequestHandler} */
    userCreate: function (req, res, next) {
        let username = req.body.username;
        User.create({ username })
            .then(newUser => {
                let { username, _id } = newUser
                res.json({ _id, username })
                next()
            })
            .catch(err => {
                if (err.name === "MongoServerError" && err.code === 11000) {
                    res.status(400).json({ username: "user with this username already exists" })
                    next()
                } else {
                    next(err)
                }
            });
    },

    /** @type {import('express').RequestHandler} */
    userList: (req, res, next) => {
        User.find()
            .select(['_id', 'username'])
            .then(users => {
                res.json(users)
                next()
            })
            .catch(err => {
                res.json({ error: err.message })
                next(err)
            })
    },


    /** @type {import('express').RequestParamHandler} */
    userRequestParamHandler: function (req, res, next, _id) {
        User.findById(_id)
            .then(user => {
                req.user = user
                next()
            })
            .catch(next)
    }
}
