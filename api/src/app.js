require("dotenv").config();

const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const cookieParser = require("cookie-parser");

const corsOptions = require("./config/cors.config");
const credentials = require("./middleware/credentials.middleware");
const checkJWT = require("./middleware/check-jwt.middleware");

//initialize express app
const app = express();

//logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// add security headers for protecting agains Cross-Site Scripting (XSS), Clickjacking, etc
app.use(helmet());

// Handle options credentials check (before CORS) and fetch cookies credentials requirement
app.use(credentials);

//set up CORS
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json (application/json)
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//public routes
app.use("/register", require("./routes/register/register.routes"));
app.use("/auth", require("./routes/auth/auth.router"));

//private routes
app.use("/api/v1", checkJWT, require("./routes/v1")); // API routes

module.exports = app;
