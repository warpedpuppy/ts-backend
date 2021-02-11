require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const app = express();
// const TestModel = require('./models/testModel')
const Config = require('./config');
const cors = require('cors');


app.use(helmet());
app.use(cors);

mongoose.connect(Config.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
.catch(error => console.error(error));

// TestModel.find()
// .then(result => console.log(result))

// app.use('/create', (req, res) => {
//     TestModel.create({name: "test", size: "test"})
// .then(result => console.log(result))
// })


app.listen(Config.PORT, () => console.log(`listening to ${Config.PORT}`))
