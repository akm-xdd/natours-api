const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

/*

* * In current implementation, we have "app.use('/api/v1/reviews', reviewRouter)" in app.js. and "router.use('/:tourId/reviews', reviewRouter)"" in tourRoutes.js.
* * This means that when the user wants to access the reviews through the tours, they will first hit the tourRouter and then the tourRouter will redirect the request to the reviewRouter. But the reviewRouter does not know the tourId. So we need to merge the parameters from the tourRouter to the reviewRouter. This is done by setting mergeParams to true in the reviewRouter.

* * This essentially results in the request params to look something like this:

* * localhost:3000/api/v1/tours/5c88fa8cf4afda39709c2953/ + localhost:3000/api/v1/reviews gives ===> 
* * localhost:3000/api/v1/tours/5c88fa8cf4afda39709c2953/reviews

* * This ensures that requests that look like this : POST /tour/5c88fa8cf4afda39709c2953/reviews as well as 
* * POST /reviews will be handled by the reviewRouter.

*/
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);
module.exports = router;
