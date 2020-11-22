const express = require("express");
const cors = require("cors");
const monk = require("monk");
const Filter = require("bad-words");
const rateLimit = require("express-rate-limit");

const app = express();

const db = monk(process.env.MONGO_URI || "localhost/meower");
const mews = db.get("mews");
const filter = new Filter();

app.enable("trust proxy");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Benvenuto !",
  });
});

app.get("/news", (req, res, next) => {
  mews
    .find()
    .then((news) => {
      res.json(news);
    })
    .catch(next);
});

app.get("/v2/news", (req, res, next) => {
  // let skip = Number(req.query.skip) || 0;
  // let limit = Number(req.query.limit) || 10;
  let { skip = 0, limit = 5, sort = "desc" } = req.query;
  skip = parseInt(skip) || 0;
  limit = parseInt(limit) || 5;

  skip = skip < 0 ? 0 : skip;
  limit = Math.min(50, Math.max(1, limit));

  Promise.all([
    news.count(),
    news.find(
      {},
      {
        skip,
        limit,
        sort: {
          created: sort === "desc" ? -1 : 1,
        },
      }
    ),
  ])
    .then(([total, news]) => {
      res.json({
        news,
        meta: {
          total,
          skip,
          limit,
          has_more: total - (skip + limit) > 0,
        },
      });
    })
    .catch(next);
});

function isValidNews(news) {
  return (
    news.name &&
    news.name.toString().trim() !== "" &&
    news.name.toString().trim().length <= 50 &&
    news.content &&
    news.content.toString().trim() !== "" &&
    news.content.toString().trim().length <= 140
  );
}

app.use(
  rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 1,
  })
);

const createNews = (req, res, next) => {
  if (isValidNews(req.body)) {
    const news = {
      name: filter.clean(req.body.name.toString().trim()),
      content: filter.clean(req.body.content.toString().trim()),
      created: new Date(),
    };

    news
      .insert(news)
      .then((createdNews) => {
        res.json(createdNews);
      })
      .catch(next);
  } else {
    res.status(422);
    res.json({
      message:
        "Hey! Name and Content are required! Name cannot be longer than 50 characters. Content cannot be longer than 140 characters.",
    });
  }
};

app.post("/news", createNews);
app.post("/v2/news", createNews);

app.use((error, req, res, next) => {
  res.status(500);
  res.json({
    message: error.message,
  });
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});
