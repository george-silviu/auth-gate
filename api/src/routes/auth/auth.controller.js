const jwt = require("jsonwebtoken");

const {
  selectUserByUsername,
  insertUserRefreshToken,
  selectUserByRefreshToken,
  deleteUserRefreshToken,
} = require("../../models/users.model");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

async function handleLogin(req, res) {
  try {
    const { username, password } = req.body;
    if (!username && !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    const foundUser = await selectUserByUsername(username);
    if (!foundUser) {
      return res
        .status(401)
        .json({ error: "The provided username doesn't exist." });
    }

    // const match = await bcrypt.compare(password, foundUser.password);

    const match = password === foundUser.password;
    if (!match) {
      return res.status(401).json({ error: "The password is incorrect." });
    }

    const roles = [foundUser.role];

    const accessToken = jwt.sign(
      {
        id: foundUser.id,
        username: foundUser.username,
        roles: roles,
      },
      accessTokenSecret,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      refreshTokenSecret,
      { expiresIn: "1d" }
    );

    try {
      await insertUserRefreshToken(foundUser.id, refreshToken);

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        //sameSite: "None",
        //secure: true, //in production, only serve the HTTPS
        maxAge: 24 * 60 * 60 * 1000, //1 day
      });

      //send the acces token as a json
      //important : this token should be saved in memory
      return res.status(200).json({ roles, accessToken });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        error:
          "Something went wrong when inserting the refresh token in database.",
      });
    }
  } catch (error) {
    console.error(error);
  }
}

async function handleRefresh(req, res) {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ error: "Cookie is not valid." });
  }

  const refreshToken = cookies.jwt;

  const foundUser = await selectUserByRefreshToken(refreshToken);

  if (!foundUser) {
    return res.status(403).json({
      error:
        "No user was found in the database with the provided refresh token.",
    });
  }

  jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }

    console.log(foundUser);

    const roles = [foundUser.role];

    console.log("roles", roles);

    const accessToken = jwt.sign(
      {
        id: foundUser.id,
        username: foundUser.username,
      },
      accessTokenSecret,
      { expiresIn: "10m" }
    );

    return res.json({ roles, accessToken });
  });
}

async function handleLogout(req, res) {
  //on client also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //is refreshToken in db?
  const foundUser = await selectUserByRefreshToken(refreshToken);
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      // secure: true, - in production, only serve the HTTPS
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204); //No content
  }

  //delete refreshToken in db
  const deleteResult = await deleteUserRefreshToken(foundUser.username);

  if (deleteResult) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      //secure: true, - in production, only serve the HTTPS
    });

    return res.sendStatus(204); //No content
  } else {
    return res.status(500).json({
      error: "Something went wrong at refresh token deletion from database.",
    });
  }
}

module.exports = { handleLogin, handleRefresh, handleLogout };
