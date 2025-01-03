const adminAuth = (req, res, next) => {
  const token = "abc";
  const isAuth = token === "abc";
  if (!isAuth)  res.status(404);
  next();
};

const userAuth = (req, res, next) => {
    const token = "ac";
    const isAuth = token === "abc";
    if (!isAuth) res.send("error").status(404);
    next();
  };

module.exports = {adminAuth, userAuth}
