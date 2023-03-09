const { Exercise } = require('../models');


module.exports = {
    /** @type {import('express').RequestHandler} */
    exerciseCreate: function (req, res, next) {
        let user = req.user
        let { description, duration, date } = req.body;

        Exercise.create({ description, duration, date, user: user })
            .then(newExercise => {
                let {
                    user: { username, _id },
                    description,
                    duration,
                    date,
                } = newExercise

                res.json({
                    username,
                    _id,
                    description,
                    duration,
                    date: date.toDateString()
                })
                next()
            })
            .catch(err => {
                res.json({
                    err,
                })
                next(err)
            })
    },

    /** @type {import('express').RequestHandler} */
    exerciseList: (req, res, next) => {
        let { username, _id } = req.user
        let { from, to, limit } = req.query

        let query = Exercise.find({ user: _id })
            .select(['description', 'duration', 'date', '-_id'])

        if (from) query.gte('date', from)
        if (to) query.lte('date', limit)
        if (limit) query.limit(limit)


        query
            .then(logs => {
                return logs.map(({ description, duration, date }) => {
                    return { description, duration, date: date.toDateString() }
                })
            })
            .then(log => {
                res.json({
                    username,
                    count: log.length,
                    _id,
                    log
                })
                next()
            })
            .catch(next)
    },

    /** @type {import('express').RequestParamHandler} */
    logQueryStringParser: (req, res, next) => {
        let { from, to, limit } = req.query

        if (from && isNaN(Date.parse(from))) {
            res.status(400).json({ error: "Invalid 'from' value." })
            next(new Error())
        }

        if (to && isNaN(Date.parse(to))) {
            res.status(400).json({ error: "Invalid 'to' value." })
            next(new Error())
        }

        if (limit && isNaN(Number(limit))) {
            res.status(400).json({ error: "Invalid 'limit' value." })
            next(new Error())
        }

        next()
    }

}
