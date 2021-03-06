var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.  set way to use router, its required in catController.js
var routes = require("./controllers/ramenController.js");
app.use(routes);  // in controller we require var router = express.Router(); and module.export(router)

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});

