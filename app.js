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
    const data = jwt.verify(req.token, "some_secret"); // if you want to access the signed payload (i.e. user object)
    res.json({ message: "here's your super secret message", data });
  } catch (err) {
    next(err);
  }
});

app.get("/secretBooks", setTokenInRequest, (req, res, next) => {
  try {
    jwt.verify(req.token, "some_secret"); // if you don't need to access the signed payload  (i.e. user object)
    res.json({ message: "here are your secret books" });
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
