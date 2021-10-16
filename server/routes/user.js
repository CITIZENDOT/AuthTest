const router = require("express").Router();
const { getUser, insertUser } = require("../controllers/User");
const { checkAuth } = require("../middlewares/user");
const jwt = require("jsonwebtoken");

function createToken(user) {
  // Expires in 1hr / 3600 seconds / 3600000 milliseconds.
  const expiresIn = Date.now() + 3600000;
  user = JSON.parse(JSON.stringify(user));
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
  return {
    token: `Bearer ${token}`,
    expiresIn: expiresIn,
  };
}

router.post("/login", async function (req, res) {
  const { userName, password } = req.body;
  if (!(userName && password))
    return res.status(400).json({
      message: "Username/Password cannot be empty",
    });

  try {
    const user = await getUser(userName, password);
    const tokenObj = createToken(user);
    return res.status(200).json(tokenObj);
  } catch (err) {
    console.log(err, Object.keys(err));
    return res.status(400).json({
      message: err.message,
    });
  }
});

router.post("/register", async function (req, res) {
  const { firstName, lastName, userName, password } = req.body;
  if (!(firstName && userName && password))
    return res.status(400).json({
      message: "FirstName/UserName/Password cannot be empty",
    });

  try {
    const result = await insertUser({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      password: password,
    });
    console.log(result);
    return res.status(200).json({
      message: "User Registered successfully!",
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(400).json({
        message: "User already exists with given username",
      });
    return res.status(400).json({
      message: err.message,
    });
  }
});

router.get("/profile", checkAuth, function (req, res) {
  return res.status(200).json({
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    userName: req.user.userName,
  });
});

module.exports = router;
