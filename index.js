const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 5000;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/kyc", (req, res) => {
  res.render("kyc");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/wfounder", (req, res) => {
  res.render("wfounder");
});

app.get("/wpepcorns", (req, res) => {
  res.render("wpepcorns");
});

app.get("/pass-reset", (req, res) => {
  res.render("passreset");
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/mailRouter"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
