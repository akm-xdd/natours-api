const Review = require('../models/reviewModel');
const CatchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllReviews = CatchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

exports.createReview = CatchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

exports.getReview = CatchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});
