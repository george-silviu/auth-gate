const authRouter = require("express").Router();

const {
  handleLogin,
  handleRefresh,
  handleLogout,
} = require("../auth/auth.controller");

authRouter.post("/login", handleLogin);
authRouter.get("/refresh", handleRefresh);
authRouter.get("/logout", handleLogout);

module.exports = authRouter;
