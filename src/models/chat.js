const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Chat'
    }, 
    sellerId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    }, 
    
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

chatSchema.virtual('messages', {
    ref: 'Message', 
    localField: '_id',
    foreignField: 'chatId'
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat 