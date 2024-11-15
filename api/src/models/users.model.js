const { pool } = require("../services/postgres");

async function selectUserByUsername(username) {
  try {
    const data = await pool.query(
      `
        SELECT 
          id, 
          username,
          password,
          role
        FROM users 
        WHERE username = $1;`,
      [username]
    );

    return data.rows[0];
  } catch (error) {
    throw error;
  }
}

async function insertUserRefreshToken(userId, refreshToken) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `
      UPDATE users
      SET token = $1
      WHERE id = $2;
      `,
      [refreshToken, userId]
    );

    await client.query("COMMIT");

    return { success: true, rowCount: result.rowCount };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function selectUserByRefreshToken(refreshToken) {
  try {
    const data = await pool.query(
      `
        SELECT 
          id, 
          username,
          role
        FROM users 
        WHERE token = $1;`,
      [refreshToken]
    );

    return data.rows[0];
  } catch (error) {
    throw error;
  }
}

async function deleteUserRefreshToken(username) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      `
        UPDATE users
        SET token = null
        WHERE username = $1;
      `,
      [username]
    );

    await client.query("COMMIT");

    return { success: true, rowCount: result.rowCount };
  } catch (error) {
    console.error(error.message);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

async function selectUsers() {
  try {
    const data = await pool.query(`SELECT * FROM users;`, []);
    return data.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  selectUserByUsername,
  insertUserRefreshToken,
  selectUserByRefreshToken,
  deleteUserRefreshToken,
  selectUsers,
};
