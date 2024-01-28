const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, // remove all white space in the beginning and end of string
    required: [true, 'A tour must have a name'], // validator
    unique: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number, // discount price
  summary: {
    type: String,
    trim: true, // remove all white space in the beginning and end of string
    required: [true, 'A tour must have a description']
  },
  description: {
    type: String,
    trim: true // remove all white space in the beginning and end of string
  },

  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },

  images: [String], // array of string

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false // hide this field
  },

  startDates: [Date] // array of date
  
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
