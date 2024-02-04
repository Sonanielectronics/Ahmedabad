const  express = require("express");
const  app = express();

// require('./db/conn');
const router = require('./router/router');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const sessions = require('express-session');
const oneDay = process.env.oneDay || 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "YOURSECRETKEYGOESHERE",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

var path = require("path");

app.use(express.static(path.join(__dirname, ".."))); 
var ejs = require("ejs");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path);

require('dotenv').config();

const  port = process.env.PORT || 3000;

require('./db/conn');

app.use('/', router);

app.listen(port, () => {
console.log(`Server running at ` + port);
});