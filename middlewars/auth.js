const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const header = req.get("Authorization");
    if (!header) {
      const error = new Error("no header provide");
      error.statusCode = 400;
      throw error;
    }

    const token = header.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
      if (error) {
        throw new Error(error);
      }
      req.userId = decoded.userId;
    });

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
