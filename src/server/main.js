const express = require("express");
const ViteExpress = require("vite-express");
const app = express();
ViteExpress.config({ mode: "production" })


const { default: axios } = require("axios");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const get = (async (url, req, res) => {
  const response = await axios.get(url, {
    headers: {
      Token: req.headers.token,
      'Content-Type': 'application/json',
    },
  })
  const result = await response.data;
  res.json(result)
});

const post = (async (url, req, res) => {
  const { id, updated_by, isPurchase } = req.body
  const response = await axios.post(url,
    isPurchase ? { id, updated_by } : { id }
    , {
      headers: {
        Token: req.headers.token,
        'Content-Type': 'application/json',
      },
    })
  const result = await response.data;
  res.json(result)
});

app.get("/get/test/records", (req, res, next) => {
  get("http://209.126.0.154" + "/get/test/records" + (req.query.query ? req.query.query : ""), req, res)
});

app.post("/test/update", (req, res, next) => {
  post("http://209.126.0.154" + "/test/update/" + req.body.isPurchase, req, res)
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
