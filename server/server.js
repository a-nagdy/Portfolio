const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const sendEmailRoutes = require('./routes/sendMail');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', sendEmailRoutes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to database');
    app.listen(process.env.PORT);
    console.log('Listening on port ' + process.env.PORT);
}).catch((err) => {
    console.log('Connection failed');
    console.log(err);
})
