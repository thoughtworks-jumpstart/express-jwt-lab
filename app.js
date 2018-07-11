const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/", (req, res, next) => {
  res.json({ message: "hello authentication!" });
});

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
};

app.get("/secret", verifyToken, (req, res, next) => {
  jwt.verify(req.token, "some_secret", (err, data) => {
    if (err) {
      next(err);
    } else {
      res.json({ message: "here's your super secret message", data });
    }
  });
});

app.post("/login", (req, res, next) => {
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
