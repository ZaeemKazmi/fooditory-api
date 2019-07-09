const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require('multer')
const sharp = require('sharp')
const Item = require('../models/item')

router.post("/item", async (req, res) => {
 const item = new Item(req.body)
    
    try {
        await item.save()       
        res.status(201).send(item)
    } catch (e) {
        res.status(400).json({error: e.errmsg ? e.errmsg : e.errors})
    }
});

module.exports = router;
