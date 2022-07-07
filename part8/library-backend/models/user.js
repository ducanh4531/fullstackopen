const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 6,
	},
	favoriteGenre: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("User", schema);
