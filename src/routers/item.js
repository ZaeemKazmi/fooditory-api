const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");
const sharp = require("sharp");

const Item = require("../models/item");
const User = require('../models/user')


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

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


router.post("/item", auth, upload.single("image"), async (req, res, next) => {
  const user = await User.findOne({_id: req.user._id});
  if (user == null) {
    res.status(400).json({error: "The user does not exist"});
    return;
  }

  const item = new Item({
    ...req.body,
    image: req.file.path,
    status: true,
    owner: user
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

router.get('/:user_id/items', async (req, res) => {
  const user = await User.findOne({_id: req.params.user_id});
  if (user == null) {
    res.status(400).json({error: "The user does not exist"});
    return;
  }

  try {
    const items = await Item.find({owner: user._id, status: true});

    res.send(items)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router;
