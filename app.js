const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine","ejs");
// mongoose.connect("mongodb://localhost:27017/covid",{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// https.get("https://api.covid19india.org/data.json", function(response) { //making a req to the given api
//
//   let chunks = [];
//
// response.on('data', function(data) {
//   chunks.push(data);
// }).on('end', function() {
//   let data   = Buffer.concat(chunks);
//   let schema = JSON.parse(data);
//   console.log(schema);
// });
// });


app.get("/", function(req, res) {
  https.get("https://api.covid19india.org/data.json", function(response) { //making a req to the given api

    let chunks = [];

  response.on('data', function(data) {
    chunks.push(data);
  }).on('end', function() {
    let data   = Buffer.concat(chunks);
    let schema = JSON.parse(data);
    res.render("home",{result: schema});
  });
  });

});
app.listen(process.env.PORT, function() {
  console.log("hello");
});
