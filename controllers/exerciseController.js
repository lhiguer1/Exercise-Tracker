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
                res.json({ username, _id, description, duration, date })
                next()
            })
            .catch(next)
    },

    /** @type {import('express').RequestHandler} */
    exerciseList: (req, res, next) => {
        let { username, _id } = req.user

        Exercise
            .find({ user: _id })
            .select(['description', 'duration', 'date', '-_id'])
            .then(logs => {
                return logs.map(({ description, duration, date }) => {
                    return { description, duration, date: date.toDateString() }
                })
            })
            .then(logs => {
                res.json({
                    username,
                    count: logs.length,
                    _id,
                    logs
                })
                next()
            })
            .catch(next)

    }
}
