const db = require("../db");
const bcrypt = require("bcrypt");

async function insertUser(userProps) {
  const { firstName, lastName, userName, password } = userProps;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [rows, fields] = await db.execute(
      "INSERT INTO Users (firstName, lastName, userName, hashedPassword) VALUES (?, ?, ?, ?)",
      [firstName, lastName, userName, hashedPassword]
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

async function getUser(userName, password) {
  try {
    const [result] = await db.execute(
      "SELECT * FROM Users WHERE userName = ?",
      [userName]
    );
    if (result.length == 0) throw Error("Username/Password is incorrect");
    const user = result[0];
    try {
      const matched = await bcrypt.compare(password, user.hashedPassword);
      if (matched) return user;
      throw Error("Username/Password is incorrect");
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  insertUser: insertUser,
  getUser: getUser,
};
