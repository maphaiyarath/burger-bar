var express = require("express");
var PORT = process.env.PORT || 8080;
var app = express();

// serve static content for the app from the "public" directory
app.use(express.static("public"));

// parse app body as JSON
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

// set handlebars
var exprBars = require("express-handlebars");
app.engine("handlebars", exprBars({ defaultLayout : "main" }));
app.set("view engine", "handlebars");

// import routes and give the server access to them
var routes = require("./controllers/burgersController.js");
app.use(routes);

// start our server so that it can begin listening to client requests
app.listen(PORT, function() {
    // log (server-side) when our server has started
    console.log("server listening on: http://localhost:" + PORT);
});