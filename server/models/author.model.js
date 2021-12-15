const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required:[true, "Must enter an author name!"],
        minLength:[3, "Author name must be at least 3 characters!"]
    },

}, { timestamps: true });

module.exports = mongoose.model('Author', AuthorSchema);