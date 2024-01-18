const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  }
  next();
});

userSchema.methods.comparePasswor = async function (inputPassword) {
  console.log(1);
  const user = this;
  console.log(user.passwrod);
  console.log(inputPassword);
  const successPassword = await bcrypt.compare(user.passwrod, inputPassword);

  return successPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
