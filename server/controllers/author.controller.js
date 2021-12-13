const Author = require("../models/author.model");

const createAuthor = (request, response) => {
    Author.create(request.body)
    .then((newAuthor) => response.json(newAuthor))
    .catch((err) => response.status(400).json(err));
};

const findAllAuthors = (request, response) => {
    Author.find({}).collation({locale:'en',strength: 2}).sort({authorName:1})
    .then((allAuthors) => {response.json(allAuthors)})
    .catch((err) => response.status(400).json(err));
};

const findOneAuthor = (request, response) => {
    Author.findById({_id: request.params._id})
    .then((oneAuthor) => {response.json(oneAuthor)})
    .catch((err) => response.status(400).json(err));
};

const updateAuthor = (request, response) => {
    Author.findByIdAndUpdate({_id: request.params._id},
        request.body,
        {
            new: true,
            runValidators: true
        })
        .then((updatedAuthor) => {response.json(updatedAuthor)})
        .catch((err) => response.status(400).json(err));
};

const deleteAuthor = (request, response) => {
    Author.deleteOne({_id: request.params._id})
    .then((deletedAuthor) => {response.json(deletedAuthor)})
    .catch((err) => response.status(400).json(err));
};

module.exports = {
    createAuthor,
    findAllAuthors,
    findOneAuthor,
    updateAuthor,
    deleteAuthor,
};