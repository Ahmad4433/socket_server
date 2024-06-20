const User = require("../../models/User");
const userList = async (req, res, next) => {
  try {
    const findedLits = await User.find().select("-password").sort({ _id: -1 });

    const filteredList = findedLits.filter((user) => {
      return user._id.toString() !== req.userId;
    });

    res
      .status(200)
      .json({ message: "success", status: true, list: filteredList });
  } catch (error) {
    next(error);
  }
};

module.exports = userList;
