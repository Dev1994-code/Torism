const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, default: "Admin" },
    // role: {
    //   type: String,
    //   enum: ["admin", "tourguide"],
    //   default: "tourguide",
    // },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
