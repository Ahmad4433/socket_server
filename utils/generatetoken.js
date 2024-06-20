const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "7d",
  });

  return accessToken;
};

module.exports = generateToken;
