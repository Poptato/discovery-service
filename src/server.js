const express = require("express");
const bodyParser = require("body-parser");
const proxy = require("express-http-proxy");

const InfoController = require("./controller/info-ctrl");

let app = new express();
let port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use("/info", InfoController);
app.use("\/(movies|celebs|oscars)(\/.+)*", proxy(process.env.MOVIE_SERVICE_HOST));
app.use("\/(cinemas|theaters|shows)(\/.+)*", proxy(process.env.SHOW_SERVICE_HOST));
app.use("\/(orders|customers)(\/.+)*", proxy(process.env.ORDER_SERVICE_HOST));

app.listen(port, () => {
   console.log(`Movie service is running on port ${port}`);
});

module.exports = app;