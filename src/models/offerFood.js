const mongoose = require("mongoose");

const offerFoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name cannot be blank."],
      minlength: [3, "Item name must be at least 3 characters."],
      maxlength: [20, "Item name must be less than 20 characters."],
      trim: true
    },
    ingredients: {
      type: String,
      required: [true, "Ingredients cannot be blank."],
      trim: true
    },
    cuisine: {
      type: String,
      required: [true, "Cuisine cannot be blank."],
      trim: true
    },
    price: {
      type: String,
      required: [true, "Price cannot be blank."],
      trim: true
    },
    currency: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      trim: true
    },
    image: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

const OfferFood = mongoose.model("OfferFood", offerFoodSchema);

module.exports = OfferFood;