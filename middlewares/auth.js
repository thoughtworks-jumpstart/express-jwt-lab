const setTokenInRequest = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader || bearerHeader.split(" ")[0] !== "Bearer") {
    res.sendStatus(403);
  }
  const bearerToken = bearerHeader.split(" ")[1];
  req.token = bearerToken;

  next();
};

module.exports = {
  setTokenInRequest,
};
