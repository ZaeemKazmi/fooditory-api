const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Chat'
    }, 
    senderId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    }, 
    msg: {
        type: String, 
        required: true,
        trim: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message 