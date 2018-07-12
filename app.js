const express = require("express");
const jwt = require("jsonwebtoken");
const { setTokenInRequest } = require("./middlewares/auth");

const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ message: "hello authentication!" });
});

app.get("/secret", setTokenInRequest, (req, res, next) => {
  jwt.verify(req.token, "some_secret", (err, data) => {
    if (err) {
      next(err);
    } else {
      res.json({ message: "here's your super secret message", data });
    }
  });
});

app.post("/signin", (req, res, next) => {
  const user = {
    id: 1,
    username: "tom",
    email: "tom@email.com"
  };

  jwt.sign({ user }, "some_secret", (err, token) => {
    res.json({ token });
  });
});

module.exports = app;
