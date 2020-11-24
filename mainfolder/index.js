//const Comunicazione = require("./src/Comunicazione");
const express = require("express");
const cors = require("cors");
const monk = require("monk");

const app = express();

const db = monk(process.env.MONGO_URI || "localhost:27017/HAP");
const newsFeed = db.get("comunicazioni");
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


function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}//evita regExp DDoS attack

app.get("/news", (req, res, next) => {
  let { search = "", skip = 0, limit = 5, sort = "desc" } = req.query; //acquisisto i valori passati come parametri tramite res.query
  const regex = new RegExp(search);//(escapeRegex(search), "gi");
  skip = parseInt(skip) || 0;
  limit = parseInt(limit) || 5;

  skip = skip < 0 ? 0 : skip;
  limit = Math.min(50, Math.max(1, limit)); // se limit<1 imposta a 1, se limit>50 imposta a 50
    newsFeed.find(
      {
        $or: [{ titolo: regex }, { testo: regex }]
      },
      {
        skip,
        limit, 
        sort: {
          data: sort === "desc" ? -1 : 1
        }
      }
    )
    .then((news) => {
      const total=news.length;
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
    news.titolo &&
    news.titolo.toString().trim() !== "" &&
    news.titolo.toString().trim().length <= 70 &&
    news.testo &&
    news.testo.toString().trim() !== "" &&
    news.testo.toString().trim().length <= 400
  );
}

const createNews = (req, res, next) => {
  if (isValidNews(req.body)) {
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
