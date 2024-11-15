const express = require("express");

const registerRouter = express.Router();

const { registerUser } = require("../users/users.controller");

registerRouter.post("/", registerUser);

module.exports = registerRouter;
