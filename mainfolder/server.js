const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); //uso il body parser incorporato in express

app.listen(5000, () => {
  console.log("Server running.");
});

app.get("/", (req, res) => {
  res.send("Helloo from the server");
});

//API news -> manda al client la lista delle news
app.get("/news", (req, res) => {
  //caricamento news dal database

  res.json(newsFeed);
});
