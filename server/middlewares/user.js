const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  const authHeader = req.headers["authorization"] || "";
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7, authHeader.length);
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      return res.status(400).json({
        message: "You have to login before viewing requested page",
      });
    }
  }
}

module.exports = {
  checkAuth: checkAuth,
};
