const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const multer = require("multer");
const sharp = require("sharp");
const Item = require("../models/item");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
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

router.post("/item", upload.single("image"), (req, res, next) => {
  console.log(req.file);

  const item = new Item({
    name: req.body.name,
    ingredients: req.body.ingredients,
    cuisine: req.body.cuisine,
    price: req.body.price,
    currency: req.body.currency,
    status: req.body.status,
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