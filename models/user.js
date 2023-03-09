const { default: mongoose } = require('mongoose')


/**
 * One-to-many relationship with Exercise
 */
module.exports = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
})
