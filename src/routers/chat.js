const express = require('express')
const auth = require('../middleware/auth')
const http = require('http')
const socketio = require('socket.io')
const Chat = require('../models/chat')
const Message = require('../models/message')
const { ObjectID } = require('mongodb')
const router = new express.Router()

const setIo = server => {
    const io = socketio(server)

    io.on('connection', (socket) => {
        console.log('New Websocket connection', socket.id)

        socket.on('private_message', async (data, callback) => {
            parsedData = JSON.stringify(data)
            console.log(parsedData)

            console.log("itemId1 ", data["itemId"])
            console.log("itemId2 ", new ObjectID(data["itemId"]))

            const _id = new ObjectID(data["chatId"])

            try {
                const existingChat = await Chat.findOne({
                    $or: [
                        { itemId: new ObjectID(data["itemId"]), buyerId: new ObjectID(data["senderId"]) },
                        // { itemId: new ObjectID(data["itemId"]), sellerId: new ObjectID(data["senderId"]) },
                        {_id}
                    ]
                })

                if (!existingChat) {     // If chat does not exists yet
                    console.log("Conversation not yet started")
                    const chat = new Chat({
                        _id: new ObjectID(data["chatId"]),
                        itemId: new ObjectID(data["itemId"]),
                        buyerId: new ObjectID(data["senderId"]),
                        sellerId: new ObjectID(data["receiverId"])
                    })

                    console.log(chat)

                    const newChat = await chat.save()

                    if (newChat === chat) {
                        const message = new Message({
                            chatId: chat._id,
                            senderId: new ObjectID(data["senderId"]),
                            msg: data["msg"]
                        })

                        const newMessage = await message.save()

                        
                        if (newMessage === message) {
                            const toId = data["receiverId"]
                            console.log(toId)
                            io.emit(toId, data)
                        } else {
                            const chatRollback = await Task.findOneAndDelete({ _id: chat._id })
                            throw {
                                name: "First-Message sending failure",
                                message: "Failed chat message rollbacked"
                            }
                        }
                    }
                } else {    // If chat already exists 
                    const message = new Message({
                        chatId: existingChat._id,
                        senderId: new ObjectID(data["senderId"]),
                        msg: data["msg"]
                    })
                    const newMessage = await message.save()

                    if (newMessage === message) {
                        const toId = data["receiverId"]
                        console.log(toId)
                        io.emit(toId, data)
                    } else {
                        throw {
                            name: "Existing Chat-Message sending failure",
                            message: "Failed to send message existing chat"
                        }
                    }
                }
            } catch (e) {
                console.log(e.name, ": " + e.message);
            }
            callback()
        })
    })
}

router.get('/conversations', auth, async (req, res) => {
    try {
        // Also correct code --- but not recommended as it applies aggregate functions 
        // which consume high memory --- do not delete this for future reference:---
        // await Chat.aggregate(
        //     [
        //         {
        //             "$lookup": {
        //                 "from": Message.collection.name,
        //                 "localField": '_id',
        //                 "foreignField": 'chatId',
        //                 "as": "messages",
        //             }
        //         },
        //         {
        //             "$match": {
        //                 "$or": [
        //                     { "buyerId": req.user._id },
        //                     { "sellerId": req.user._id }
        //                 ]
        //             }
        //         },
        //         { "$sort": { "updatedAt": -1 } }
        //     ], (err, result) => {
        //         // "tags" is now filtered by condition and "joined"
        //         if (err) {
        //             res.statue(400).send(err.name, ": " + err.message);
        //         } else {
        //             res.send(result)
        //         }
        //     }
        // )

        const chats = await Chat.find({
            "$or": [
                { "buyerId": req.user._id },
                { "sellerId": req.user._id }
            ],
        }).sort({ "updatedAt": -1}).populate('messages').exec();
        res.json(chats)
    } catch (e) { console.log(e) }
})

// Returns all for specific user, if logged in user is a sender or receiver of it
router.get('/chats', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const chats = await Chat.find({
            "$or": [
                { "buyerId": req.user._id },
                { "sellerId": req.user._id }
            ],
        }).sort({ "updatedAt": -1});
        res.json(chats)
    } catch (e) { console.log(e) }
})

// Returns messages for specific chat, if logged in user is a sender or receiver of it
router.get('/messages/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const chat = await Chat.findOne({ _id , 
            "$or": [
            { "buyerId": req.user._id },
            { "sellerId": req.user._id }
        ]}).sort({ "createdAt": 1}).populate('messages').exec();

        if(!chat){
            return res.status(404).send()
        }
        res.json(chat.messages)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = { setIo, router }