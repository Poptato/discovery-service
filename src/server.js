const express = require("express");
const bodyParser = require("body-parser");
const proxy = require("express-http-proxy");

const InfoController = require("./controller/info-ctrl");

let app = new express();
let port = process.env.PORT || 4000;

const movieService = process.env.MOVIE_SERVICE_HOST;
const showService = process.env.SHOW_SERVICE_HOST;
const orderService = process.env.ORDER_SERVICE_HOST;

app.use(bodyParser.json());

app.use("/info", InfoController);
app.use("/movies", proxy(movieService + "/movies"));
app.use("/celebs", proxy(movieService + "/celebs"));
app.use("/oscars", proxy(movieService + "/oscars"));
app.use("/cinemas", proxy(showService + "/cinemas"));
app.use("/theaters", proxy(showService + "/theaters"));
app.use("/shows", proxy(showService + "/shows"));
app.use("/orders", proxy(orderService + "/orders"));
app.use("/customers", proxy(orderService + "/customers"));

app.listen(port, () => {
   console.log(`Movie service is running on port ${port}`);
});

module.exports = app;