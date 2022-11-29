
const express = require('express');
const cors = require('cors');
const { connectionDB } = require('./database/connect-db');

const app = express();



connectionDB();


app.use(cors());


app.use(express.json())




//Routes
app.use("/api/post", require("./routes/post.route"));
app.use("/api/auth" ,require("./routes/auth.route"));
app.use("/api/uploads", require("./routes/uploads.route"))
module.exports = app;
