const bcrypt = require("bcrypt");

const { insertUser, selectUsers } = require("../../models/users.model");

async function registerUser(req, res) {
  const data = req.body;

  //check if user and password are sent
  if (!data.username || !data.password || !data.company || !data.role)
    return res
      .status(400)
      .json({ message: "All registration fields are required!" });

  try {
    //generate random salt
    const salt = await bcrypt.genSalt();

    //create a hash using sent password and salt
    const hash = await bcrypt.hash(data.password, salt);

    //store salt and hash in db
    await insertUser(data, salt, hash);

    return res.status(200).json({ message: "User inserted with success." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong when registering the user." });
  }
}

async function getUsers(req, res) {
  try {
    res.status(200).json(await selectUsers());
  } catch (error) {
    console.error(`\x1b[31mError in getUsers : ${error.message} \x1b[31m`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  registerUser,
  getUsers,
};
