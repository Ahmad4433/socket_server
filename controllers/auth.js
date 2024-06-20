const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const { token } = req.body;
  try {
    if (!token) {
      const error = new Error("no token provided");
      error.statusCode = 400;
      throw error;
    }
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    

    if (decoded) {
      res
        .status(200)
        .json({ message: "success", status: true, userId: decoded.userId });
    } else {
      res.status(200).json({ message: "success", status: false });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authUser;
