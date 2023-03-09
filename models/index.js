const { default: mongoose } = require('mongoose')
const userSchema = require('./user')
const exerciseSchema = require('./exercise')

let Exercise = mongoose.model('Exercise', exerciseSchema)

userSchema.pre('remove', function (next) {
    Exercise.deleteMany({ user: this._id })
        .then(() => next())
        .catch(next)
})

let User = mongoose.model('User', userSchema)

module.exports = {
    User,
    Exercise,
}
