const express = require("express");
const jwt = require("jsonwebtoken");
const { setTokenInRequest } = require("./middlewares/auth");

const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ message: "hello authentication!" });
});

app.get("/secret", setTokenInRequest, (req, res, next) => {
  try {
    jwt.verify(req.token, "some_secret");
    res.json({ message: "here's your super secret message" });
  } catch (err) {
    next(err);
  }
});

app.post("/signin", (req, res, next) => {
  const user = {
    id: 1,
    username: "tom",
    email: "tom@email.com"
  };

  const token = jwt.sign({ user }, "some_secret");

  res.json({ token });
});

module.exports = app;
