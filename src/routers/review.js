const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const User = require('../models/user');
const Review = require('../models/review');


router.post('/review', auth, async (req, res) => {
    console.log(req);
  res.status(201).send("ok");
})

router.get('/users/:id/reviews', async (req, res) => {
    const user = await User.findOne({_id: req.params.id});
    if (user == null) {
        res.status(400).json({error: "The user does not exist"});
        return;
    }

    try {
        const reviews = await Review.find({sellerId: user});

        res.send(reviews)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router