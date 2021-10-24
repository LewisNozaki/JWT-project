// Imports
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const rootDir = require("./helpers/path-helper");
const cookieParser = require("cookie-parser");

// routes import
const smoothiesRouter = require("./routes/smoothies.routes");
const homeRouter = require("./routes/home.routes");
const authRouter = require("./routes/auth.routes");

require("dotenv").config({ path: path.join(rootDir, "secure", ".env") });

const PORT = process.env.PORT || 3000;

const app = express();

// middleware
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection & app start
mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(result => {
    console.log("connected to MongoDB Atlas");
    app.listen(PORT, () => console.log("server running on port", PORT));
  })
  .catch(err => console.log(err));

// routes
app.use(smoothiesRouter);

app.use(authRouter);

app.use(homeRouter);

// Cookies
app.get("/set-cookies", (req, res) => {
  // this functin sets cookies within the browser
  res.cookie("newUser", true);
  // some extra example properties when setting cookies...
  // maxAge = how long the cookie lasts. Default is sessions. 
  // Secure = only saved when using https.
  // httpOnly = Cannot accessed via browser/javascript
  res.cookie("isEmployee", false, { maxAge: 1000 * 60 * 60 * 24 });
  
  res.send("Successfully set cookies");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404');
});