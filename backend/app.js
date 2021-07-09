// app.js

const express = require('express');
var bodyParser = require("body-parser");
const connectDB = require('./config/db');
var cors = require('cors');

const app = express();
var useragent = require('express-useragent');
var url = require('./routes/url.js');

// Connect Database
connectDB();

app.use(useragent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/url',url);

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
