const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const accommodationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, "Your accommodation name cannot be blank."],
    trim: true
  },
  street: {
    type: String,
    required: [true, "Your street cannot be blank."]
  },
  zipcode: {
    type: String,
    required: [true, "Your zipcode cannot be blank."],
    minlength: [4, "Display name must be at least 4 characters."],
    trim: true
  },
  city: {
    type: String,
    required: [true, "Your city cannot be blank."],
    trim: true
  },
  country: {
    type: String,
    required: [true, "Your country cannot be blank."],
    trim: true
  }
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Your display name cannot be blank."],
      minlength: [3, "Display name must be at least 3 characters."],
      maxlength: [20, "Display name must be less than 20 characters."],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email cannot be blank."],
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      }
    },
    password: {
      type: String,
      required: [true, "Your password cannot be blank."],
      minlength: [7, "Password must be at least 7 characters."],
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      }
    },
    image: {
      type: String
      // ,
      // required: true
    },
    countryOfOrigin: {
      type: String,
      required: [true, "CountryOfOrigin cannot be blank."],
      trim: true,
      lowercase: true
    },
    accommodation: {
      type: accommodationSchema,
      required: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.virtual('items', {
  ref: 'Item', 
  localField: '_id',
  foreignField: 'sellerId'
})

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("just before saving!");

  next();
});

// // Delete user tasks when user is removed
// userSchema.pre("remove", async function(next) {
//   const user = this;
//   await Task.deleteMany({ owner: user._id });
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;