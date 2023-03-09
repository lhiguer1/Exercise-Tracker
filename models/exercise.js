const { default: mongoose } = require('mongoose')

module.exports = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },

    duration: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})
