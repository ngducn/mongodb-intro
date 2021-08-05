const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "API landing page" });
});

/**User routes */
const userRoute = require("./user.api");
router.use("/user", userRoute);

/**Auth routes */
const authRoute = require("./auth.api");
router.use("/auth", authRoute);

/**Product routes */
// const productRoute = require("./product.api");
// router.use("/product", productRoute);

// /**Order routes */
// const orderRoute = require("./order.api");
// router.use("/order", orderRoute);

/**Review routes */
const reviewRoute = require("./review.api");
router.use("/review", reviewRoute);

module.exports = router;