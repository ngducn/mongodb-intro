/**
 * express
 * Description: Is the Web API framwork for NodeJS
 * Contain : function such as use, get
 */
 const express = require("express");
 require("dotenv").config();
 
 /**
  * path
  * Description: support functions relating to Nodejs file path
  * Usage : as global middleware
  */
 
 const path = require("path");
 
 /**
  * cookie-parser
  * Description: help expose cookie in the request header to req.cookies and req.signedCookies if cookie is secret
  * Usage : as global middleware
  */
 const cookieParser = require("cookie-parser");
 
 /**
  * morgan
  * Description: is a middleware that help console.log every request and response
  * Usage : as global middleware
  */
 const logger = require("morgan");
 
 /**
  * Import index root router
  */
 const indexRouter = require("./routes/index");
 
 /**
  * Import cors to handle cross origin policy
  */
 const cors = require("cors");
 const utilHelpers = require("./helpers/util.helper");
 
 const app = express();
 
 const mongoose = require("mongoose");
 
 const mongodUri = process.env.MONGOD_URI;
 
 mongoose
   .connect(mongodUri, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .then(() => console.log(mongodUri))
   .catch((err) => console.log(err.message));
 
 //Log req,res,err
 app.use(logger("dev"));
 //Parse Json to data
 app.use(express.json());
 //encoded url
 app.use(express.urlencoded({ extended: false }));
 //Expose cookie
 app.use(cookieParser());
 //Create path to folder
 app.use(express.static(path.join(__dirname, "public")));
 //Apply cors policy
 app.use(cors());
 
 //Create default route to indexRouter
 app.use("/api", indexRouter);
 
 // catch 404 and forard to error handler
 app.use((req, res, next) => {
   const err = new Error("Not Found");
   err.statusCode = 404;
   next(err);
 });
 
 /* Initialize Error Handling */
 app.use((err, req, res, next) => {
   console.log("ERROR", err.message);
   return utilHelpers.sendResponse(
     res,
     err.statusCode ? err.statusCode : 500,
     false,
     null,
     [{ message: err.message }],
     null
   );
 });
 module.exports = app;