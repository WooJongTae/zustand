const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const movieSchema = new mongoose.Schema({
  movieId: {
    type: String,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
