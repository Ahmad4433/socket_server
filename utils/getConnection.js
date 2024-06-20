const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then((connection) => {
        console.log("db is connected");
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getConnection;
