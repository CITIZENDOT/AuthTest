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

async function changePassword(userName, currentPassword, newPassword) {
  try {
    await getUser(userName, currentPassword);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await db.execute(
      "UPDATE Users SET hashedPassword = ? WHERE userName = ?",
      [hashedPassword, userName]
    );
    return result.affectedRows == 1;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  insertUser: insertUser,
  getUser: getUser,
  changePassword: changePassword,
};
