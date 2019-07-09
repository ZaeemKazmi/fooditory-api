const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require('multer')
const sharp = require('sharp')
const OfferFood = require('../models/offerFood')

router.post("/offerFood", async (req, res) => {
 const offerFood = new OfferFood(req.body)
    
    try {
        await offerFood.save()       
        res.status(201).send(offerFood)
    } catch (e) {
        res.status(400).json({error: e.errmsg ? e.errmsg : e.errors})
    }
});

module.exports = router;
