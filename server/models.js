const mongoose = require("mongoose");

const connStr =
  process.env.MONGO_CONNECTION_STRING || "mongodb://localhost/quotedb";
const conn = mongoose.connect(connStr, {
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
