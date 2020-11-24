//const Comunicazione = require("./src/Comunicazione");
const express = require("express");
const cors = require("cors");
const monk = require("monk");
//const Filter = require("bad-words");

const app = express();

const db = monk(process.env.MONGO_URI || "localhost:27017/HAP");
const newsFeed = db.get("comunicazioni");
//const filter = new Filter();
app.enable("trust proxy");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});

app.get("/", (req, res) => {
  res.json({
    message: "Benvenuto !",
  });
});

/*
getNews v1
app.get("/news", (req, res, next) => {
  newsFeed
    .find()
    .then((news) => {
      console.log(news);
      res.json(news); //NON FUNZIONA
    })
    .catch(next);
});*/

app.get("/news", (req, res, next) => {
  //let skip = Number(req.query.skip) || 0;
  //let limit = Number(req.query.limit) || 10;
  let { skip = 0, limit = 5, sort = "desc" } = req.query; //acquisisto i valori passati come parametri tramite res.query
  skip = parseInt(skip) || 0;
  limit = parseInt(limit) || 5;

  skip = skip < 0 ? 0 : skip;
  limit = Math.min(50, Math.max(1, limit)); // se limit<1 imposta a 1, se limit>50 imposta a 50

  Promise.all([
    //uso una promise per fare entrambe le query insieme
    newsFeed.count(),
    newsFeed.find(
      {}, //query
      {
        skip,
        limit,
        sort: {
          data: sort === "desc" ? -1 : 1,
        },
      }
    ),
  ])
    .then(([total, news]) => {
      res.json({
        //risposta al server
        news,
        meta: {
          total,
          skip,
          limit,
          has_more: total - (skip + limit) > 0, //true se ce ne sono ancora, false altrimenti
        },
      });
    })
    .catch(next);
});

function isValidNews(news) {
  return (
    news.name &&
    news.name.toString().trim() !== "" &&
    news.name.toString().trim().length <= 70 &&
    news.content &&
    news.content.toString().trim() !== "" &&
    news.content.toString().trim().length <= 400
  );
}

const createNews = (req, res, next) => {
  if (isValidNews(req.body)) {
    console.log(req.body);
    const comunicazione = {
      titolo: req.body.titolo.toString().trim(),
      testo: req.body.testo.toString().trim(),
      data: new Date(),
    };

    newsFeed
      .insert(comunicazione)
      .then((createdNews) => {
        res.json(createdNews);
      })
      .catch(next);
  } else {
    res.status(422);
    res.json({
      message:
        "Hey! Name and Content are required! Name cannot be longer than 70 characters. Content cannot be longer than 400 characters.",
    });
  }
};

app.post("/news", createNews);
//app.post("/v2/news", createNews);

app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    message: error.message,
  });
});
