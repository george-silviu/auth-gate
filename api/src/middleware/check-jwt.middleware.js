const jwt = require("jsonwebtoken");

/**
 *  The middleware checks if the token exists in authorization header, and validates it.
 */
const checkJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); //Forbidden - invalid token; signal the refresh
    }

    req.userId = decoded.id;
    req.username = decoded.username;
    req.userRoles = decoded.roles;
    next();
  });
};

module.exports = checkJWT;
