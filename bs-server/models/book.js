const mongoose = require('mongoose');
const defaultData = require('./books.json');
const BookSchema = mongoose.Schema({
    author: { type: String, index : true },
    imageLink: { type: String },
    language: { type: String },
    pages: { type: Number },
    title: { type: String, index : true },
    year: { type: Number },
    addedBy:  { type: String },
    isCoverAvailable: { type: Boolean },
    searchCount: { type: Number, default: 0 },
    addedOn: { type: Date, default: Date.now()}
});
const Book = module.exports = mongoose.model('Book', BookSchema);

const populateDB = function () {
    Book.create(defaultData, function (err, small) {
        if (err) return handleError(err);
        console.log("Data Populated");
    });
}
module.exports.checkForDB = function () {
    Book.count(function (err, count) {
        if (!err && count === 0) {
            populateDB();
        }
    });
}


module.exports.addNewBook = function (newBook, callback) {
    newBook.save(callback);
}

module.exports.getAllBook = function (callback) {
    let query = { }
    Book.find(query, callback).sort({addedOn : -1});
}

module.exports.searchForBook = function (req, callback) {
    let sText = req.body.text;
    let query = {$or: [{author: { $regex: ".*" + sText + ".*", $options: "i" }}, {title: { $regex: ".*" + sText + ".*", $options: "i" }}]};
    Book.find(query).exec(callback);
}

module.exports.deleteOneBook = function (id, callback) {
    const query = { _id: id }
    Book.remove(query, callback);
}

module.exports.increaseSearchCounter = function (id, callback) {
    Book.findByIdAndUpdate(id, {
        $inc: { searchCount : 1 }
    }, callback);
}

module.exports.getTopFiveSearchedBooks = function (callback) {
    let query = { }
    Book.find(query, callback).sort({searchCount : -1}).limit(5);
}
