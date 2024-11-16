const allowedOrigins = require("../config/allowed-origins.config");

/**
 * ! Remove '|| !origin' in production
 *
 * This middleware is complementary to CORS mechanism and ensures that only
 * allowed origins can send cookies, tokens or other credentials to this server.
 *
 * */
const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
