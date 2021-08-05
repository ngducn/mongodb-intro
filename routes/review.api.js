const express = require("express");
const reviewController = require("../controllers/review.controller");
const router = express.Router();

/**
 * @route POST api/auth/review
 * @description User can create a review
 * @access Public
 */
router.post("/", reviewController.createReview);

/**
 * @route PUT api/auth/review/:id
 * @description User can update a review
 * @access Public
 */
router.put("/:id", reviewController.updateReview);

/**
 * @route DEL api/auth/review/:id
 * @description User can delete a review
 * @access Public
 */
 router.delete("/:id", reviewController.deleteReview);

module.exports = router;