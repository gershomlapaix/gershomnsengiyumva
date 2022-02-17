const express = require("express");
const morgan = require("morgan");

// security modules
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();

// GLOBAL MIDDLEWARES
// 1. Set security HTTP Headers : helmet
app.use(helmet());

// 2. Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 3. Implement rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 100 requests within 1h
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter); // apply rate-limiting to all routes starting with "api"

// 4. Body parser, readind data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "difficulty",
      "price",
    ], // allow duplicate fields
  })
);
// 5. Serving static files
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/electricity", require("./routes/userRoutes"));

// this will not run if request-response cycle ended in above routes
app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
