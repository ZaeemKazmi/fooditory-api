const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const User = require('../models/user');
const Review = require('../models/review');
const Item = require('../models/item');


router.post('/user/:id/review', auth, async (req, res) => {
    const seller = await User.findOne({_id: req.params.id});
    if (seller == null) {
        res.status(404).json({error: "The user does not exist"});
        return;
    }

    try {
        const transactions = await Item.aggregate([
            {
                $match: {sellerId: seller._id, buyerId: req.user._id}
            },
            {
                $group: {
                    _id: {
                        yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$soldAt" }}
                    }
                }
            }
        ]);

        const pastReviews = await Review.find({sellerId: seller, buyerId: req.user});

        if (transactions.length > pastReviews.length) {
            const review = new Review({
                ...req.body,
                sellerId: seller,
                buyerId: req.user
            })
            review
                .save()
                .then(result => {
                  res.status(201).json(review);
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
        }
        else {
            res.status(400).json({error: "You are not alloewd to post the review"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})

router.get('/users/:id/reviews', async (req, res) => {
    const user = await User.findOne({_id: req.params.id});
    if (user == null) {
        res.status(404).json({error: "The user does not exist"});
        return;
    }

    try {
        const reviews = await Review.find({sellerId: user});

        res.json(reviews);
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router