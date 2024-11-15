const v1 = require("express").Router();

const userRouter = require("./users/users.router");

v1.use("/users", userRouter);

module.exports = v1;
