const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");
const sharp = require("sharp");
const Item = require("../models/item");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

router.get('/itemInfo/:id', async (req, res) => {
  const _id = req.params.id

  try {
    await Item.findOne({ _id })
      .populate('seller')
      .exec((err, item) => {
        if (err) res.status(500).send()
        res.send({ "sellerName": item.seller[0].name, "itemName": item.name, "status": item.status, "buyerId": item.buyerId });
      });

  } catch (e) {
    res.status(500).send()
  }
})

router.get('/items/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const item = await Item.findOne({ _id })

    if (!item) {
      return res.status(404).send()
    }
    res.json(item)
    
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/items/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['sellerId', 'buyerId', 'name', 'ingredients', 'cuisine', 'price', 'status', 'image']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({error : 'Invalid updates!'})
  }

  try { 
      const item = await Item.findOne({ _id: req.params.id , sellerId: req.user._id})

      if(!item) {
          return res.status(404).send()
      } 

      updates.forEach((update) => item[update] = req.body[update]) 
      await item.save()

      res.send(item)
  } catch (e) {
      res.status(400).send(e)
  }
})

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post("/item", upload.single("image"), (req, res, next) => {
  console.log(req.file);

  const item = new Item({
    buyerId: "",
    sellerId: req.body.sellerId,
    name: req.body.name,
    ingredients: req.body.ingredients,
    cuisine: req.body.cuisine,
    price: req.body.price,
    currency: req.body.currency,
    status: true,
    image: req.file.path
  });
  item
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created item successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "POST",
            url: "http://localhost:8080/uploads/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
