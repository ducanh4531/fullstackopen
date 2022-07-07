const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	born: {
		type: Number,
	},
	books: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
		},
	],
	bookCount: Number
});

module.exports = mongoose.model("Author", schema);
