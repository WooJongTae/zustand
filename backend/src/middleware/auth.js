const jwt = require("jsonwebtoken");
const User = require("../models/User");

let auth = async (req, res, next) => {
  const header = req.headers.authorization.split(" ");
  const token = header[1];
  if (token === null) {
    return res.sendStatus(401);
  }

  try {
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById({ _id: decode.userId });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
