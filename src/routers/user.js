const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");
const Item = require("../models/item");
const Review = require('../models/review');
const auth = require("../middleware/auth");
const { ObjectID } = require("mongodb");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");
const router = new express.Router();

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

router.post("/signup", upload.single("image"), (req, res, next) => {
  console.log(req.file);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image: req.file.path,
    countryOfOrigin: req.body.countryOfOrigin,
    accommodation: {
      name: req.body.accommName,
      street: req.body.accommStreet,
      zipcode: req.body.accommZipcode,
      city: req.body.accommCity,
      country: req.body.accommCountry
    }
  });
  user
    .save()
    .then(result => {
      sendWelcomeEmail(req.body.email, req.body.name);
      console.log(result);
      res.status(201).json({
        message: "Account created successfully",
        createdProduct: {
          name: result.name,
          email: result.email,
          _id: result._id,
          request: {
            type: "POST",
            url: "http://localhost:8080/uploads/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err.errmsg);
      res.status(500).json({
        error: err.errmsg
      });
    });
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/username/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(404).send();
    }
    res.send(JSON.stringify({ name: user.name }));
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/user/:id', auth, async (req, res) => {
  let seller = await User.findOne({_id: req.params.id});
  if (seller == null) {
    res.status(400).json({error: "The user does not exist"});
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

    seller = seller.toObject();
    seller["allowReview"] = transactions.length > pastReviews.length;

    const stars = await Review.aggregate([
      {
        $match: { sellerId: seller._id }
      },
      {
        $group: {
          _id: "$sellerId",
          stars: {
            $avg: "$stars"
          },
          reviews: { $sum: 1 }
        }
      }
    ]);
    seller["stars"] = (stars.length > 0) ? stars[0].stars : 0;
    seller["reviews"] = (stars.length > 0) ? stars[0].reviews : 0;

    res.json(seller);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);

    if (!user || !user.image) {
      throw new Error();
    }

    res.sendfile(user.image);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/userData/:id", async(req, res)=>{
  
  try {
    
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  
  } catch (e) {
    
    res.status(500).send();
  }

});

module.exports = router;
