const mongoose = require("mongoose");
const converSchema = new mongoose.Schema(
  {
    parties: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    message: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversion", converSchema);
