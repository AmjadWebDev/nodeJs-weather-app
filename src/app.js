const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utilis/geocode");
const forecast = require("./utilis/forecast");

const app = express();
const port = process.env.PORT || 3000;
//Define paths for express cofig
const publicPathDirc = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// setup static directory to serve
app.use(express.static(publicPathDirc));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Amjad Alsamman",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Amjad Alsamman",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    msg: "https://github.com/AmjadWebDev",
    title: "Contact-me",
    name: "Amjad Alsamman",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.city) {
    return res.send({
      error: "You must provide an city name",
    });
  }
  geocode(req.query.city, (error, { latitude, langitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, langitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        City: req.query.city,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// normally we put at the end after express not found a match
app.get("/contact/*", (req, res) => {
  res.render("pageNotFound", {
    title: "404",
    name: "Amjad Alsamman",
    errorMessage: "contact Article not Found",
  });
});

app.get("*", (req, res) => {
  res.render("pageNotFound", {
    title: "404",
    name: "Amjad Alsamman",
    errorMessage: "Page not Found",
  });
});

app.listen(port, () => {
  console.log("Server is working good " + port);
});

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Amjad",
//       age: 34,
//     },
//     {
//       name: "Walaa",
//       age: 28,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Us</h1>");
// });
