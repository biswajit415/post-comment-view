const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/key");
const port = process.env.PORT || 5000
const connect = mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', require('./routes/userRoute'))
app.use('/api', require('./routes/postRout'))
app.listen(port)