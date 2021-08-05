const utilHelpers = require("../helpers/util.helper");
const { catchAsync, AppError } = require("../helpers/util.helper");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { findById } = require("../models/User");
const userController = {};

userController.createAccountWithEmail = catchAsync(async (req, res, next) => {
  let { name, email, password } = req.body;
  if (!name || !email || !password)
    return next(new AppError(400, "not enough data", "Register Error"));

  //if this email is not existed in our data
  let user = await User.findOne({ email });
  if (user) {
    return next(
      new AppError(409, "Email already registered", "Register Error")
    );
  }
  //encrypt the password
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = await User.create({
    name,
    email,
    password,
  });
  const accessToken = await user.generateToken();

  //add this to the database

  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { accessToken },
    null,
    "Create user success"
  );
});

userController.updateUserInfo = catchAsync(async (req, res, next) => {
  const { userId } = req;
  const { name } = req.body;
  let user = await User.findById(userId);
  if (!user)
    return next(new AppError(300, "User not found", "User Update Error"));
  if (!name)
    return next(new AppError(300, "No new changes", "User Update Error"));

  user = await User.findByIdAndUpdate(userId, { name }, { new: true });

  return utilHelpers.sendResponse(
    res,
    200,
    true,
    { user },
    null,
    "success update user info"
  );
});
module.exports = userController;