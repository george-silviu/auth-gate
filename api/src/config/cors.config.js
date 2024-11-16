const allowedOrigins = require("./allowed-origins.config");

const corsOptions = {
  origin: (origin, callback) => {
    //if the origin exists in allowed origins OR no origin is sent(for server to server requests)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //allow the request
      callback(null, true);
    } else {
      //reject the request
      callback(new Error("Your origin is not allowed by CORS!"));
    }
  },
  optionsSuccessStatus: 200, //preflight requests handle
};

module.exports = corsOptions;
