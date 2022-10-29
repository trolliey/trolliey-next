const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "a username is required"],
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },
    store: {
      type: String,
      default: "",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    province: {
      type: String,
      default: "",
    },
    postal: {
      type: String,
      default: "",
    },
    confirmationCode: {
      type: String,
      default: "",
    },
    resetPasswordCode: {
      type: String,
      default: "",
    },
    photoURL: {
      type: String,
      default: "",
    },
    authMethod:{
      type: String,
      enum: ['email', 'google'],
      default: 'email'
    },
    googleAuthId:{
      type:String,
      default: ''
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
