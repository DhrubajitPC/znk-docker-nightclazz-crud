const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const model = require("./models");

const port = 8080;

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  console.log("fetching quotes");
  try {
    const quotes = await model.find();
    res.send(quotes);
  } catch {
    res.sendStatus(500).send(e);
  }
});

app.post("/new", async (req, res) => {
  console.log("creating a new quote");
  const { author, body } = req.body;
  try {
    const newQuote = await model.create({ author, body });
    res.status(201).send(newQuote);
  } catch {
    res.status(500).send(e);
  }
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`deleting quote with id ${id}`);
  try {
    await model.deleteOne({ _id: id });
    res.sendStatus(200);
  } catch {
    res.status(500).send(e);
  }
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { author, body } = req.body;
  console.log(`updating quote with id ${id}`);
  try {
    await model.updateOne({ _id: id }, { author, body });
    res.sendStatus(200);
  } catch {
    res.status(500).send(e);
  }
});

app.listen(port, () => console.log(`server running at ${port}`));
