const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    try {
      const decodedToken = jwt.verify(authToken, process.env.SECRET_TOKEN);
      if (!!decodedToken) {
        req.userId = JSON.parse(decodedToken);
        next();
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Invalid Auth Token" });
      }
    } catch (err) {
      console.log(err);
      return res
        .status(403)
        .json({ success: false, message: "authenticate error" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "User Not Logged In" });
  }
};

module.exports = { isAuthenticated };
