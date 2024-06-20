const User = require("../../models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");
const regitsrUser = async (req, res, next) => {
  const { error: validationerror } = validateUser(req.body);
  const { name, email, password } = req.body;

  try {
    if (validationerror) {
      const error = new Error(validationerror.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const isExist = await User.findOne({ email: email });

    if (isExist) {
      const error = new Error("this email is already exist");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "account created successfully",
      status: true,
      userId: savedUser._id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = regitsrUser;

function validateUser(data) {
  const userSchema = joi.object({
    name: joi.string().required().min(3).trim(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(12),
  });

  return userSchema.validate(data);
}
