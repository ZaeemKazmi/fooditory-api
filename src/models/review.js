const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  point: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review