const utilHelpers = require("../helpers/util.helper");
const Review = require("../models/Review");
const reviewController = {};

reviewController.createReview = utilHelpers.catchAsync(async (req, res, next) => {
  return utilHelpers.sendResponse(
    res,
    200,
    true,
    {},
    null,
    "success create review"
  );
});

reviewController.updateReview = async (req, res, next) => {
  return utilHelpers.sendResponse(
    res,
    200,
    true,
    {},
    null,
    "success update review"
  );
};

reviewController.deleteReview = async (req, res, next) => {
  return utilHelpers.sendResponse(
    res,
    200,
    true,
    {},
    null,
    "success delete review"
  );
};
module.exports = reviewController;