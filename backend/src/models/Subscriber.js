const mongoose = require("mongoose");
const subscriberSchema = new mongoose.Schema({
  // to 받는 from 주는
  movieId: {
    type: String,
  },
  userForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
