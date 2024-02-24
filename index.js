const express = require("express");
const app = express();
const apiRoutes = require("./route/Route");
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/user", apiRoutes);
app.listen(8081, () => {
  console.log(`server start localhost ${8081}`);
});
