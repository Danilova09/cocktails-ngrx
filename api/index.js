const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const config = require('./config');
const users = require('./app/users');
const cocktails = require('./app/cocktails');
const ingredients = require('./app/ingredients');
const port = 8000;

const whitelist = ['http://localhost:4200', 'https://localhost:4200'];

const corsOptions = {
    origin: (origin, callback) => {
        if (origin === undefined || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/users', (users));
app.use('/cocktails', (cocktails));
app.use('/ingredients', (ingredients));


const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server is listening port ${port}...`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    })
}

run().catch(e => console.log(e));





