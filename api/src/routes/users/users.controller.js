const { selectUsers } = require("../../models/users.model");

async function getUsers(req, res) {
  try {
    res.status(200).json(await selectUsers());
  } catch (error) {
    console.error(`\x1b[31mError in getUsers : ${error.message} \x1b[31m`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getUsers,
};
