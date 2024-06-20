const User = require("../../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generatetoken");
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isExist = await User.findOne({ email: email });
    if (!isExist) {
      const error = new Error("invalid email address");
      error.statusCode = 400;
      throw error;
    }

    const isPassMatch = await bcrypt.compare(password, isExist.password);

    if (!isPassMatch) {
      const error = new Error("invalid password");
      error.statusCode = 400;
      throw error;
    }

    const accessToken = generateToken({ userId: isExist._id });

    res
      .status(200)
      .json({ message: "success", status: true, token: accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
