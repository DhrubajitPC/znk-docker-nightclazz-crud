const mongoose = require("mongoose");

const conn = mongoose.connect("mongodb://localhost/quotedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Quote = new Schema({
  author: String,
  body: String,
  id: ObjectId,
});

const QuoteModel = mongoose.model("Quote", Quote);

module.exports = QuoteModel;
