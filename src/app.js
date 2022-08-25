"use strict";

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// Define paths
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup HBS and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ivan Cubinar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText:
      "How to use the App: Just input any location and click search button.",
    name: "Ivan Cubinar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Ivan Cubinar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }

        forecast(latitude, longitude, (error, { message }) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            forecast: message,
            location: location,
            address: req.query.address,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Ivan Cubinar",
    errorText: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Ivan Cubinar",
    errorText: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
