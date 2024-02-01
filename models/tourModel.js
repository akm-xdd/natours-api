const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // remove all white space in the beginning and end of string
      required: [true, 'A tour must have a name'], // validator
      unique: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'], // validator
      minlength: [10, 'A tour name must have more or equal then 10 characters'] // validator
    },

    slug: String,

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
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above or equal to 1.0'], // validator
      max: [5, 'Rating must be below or equal to 5.0'] // validator
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: { 
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    }, 
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

    startDates: [Date], // array of date

    secretTour: {
      type: Boolean,
      default: false
    }
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  // this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  // console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  // console.log(docs);
  next();
});

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
