// Imports
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const rootDir = require("./helpers/path-helper");

require("dotenv").config({ path: path.join(rootDir, "secure", ".env") });

const PORT = process.env.PORT || 3000;

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(result => {
    console.log("connected to MongoDB Atlas");
    app.listen(PORT, () => console.log("server running on port", PORT));
  })
  .catch(err => console.log(err));


// routes
app.get('/', (req, res) => res.render('home'));

app.get('/smoothies', (req, res) => res.render('smoothies'));