const userRouter = require("express").Router();

const { getUsers } = require("./users.controller");

userRouter.get("/", getUsers);

module.exports = userRouter;
