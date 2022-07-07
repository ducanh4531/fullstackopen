const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		minlength: 2,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Author",
	},
	published: {
		type: Number,
	},
	genres: [{ type: String }],
});

module.exports = mongoose.model("Book", schema);
