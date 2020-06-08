const express = require('express');
const bodyParser = require('body-parser');
const server = require('./server/routes/server.route');





const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
//let dev_db_url = "mongodb+srv://rvohra:asdfg1#hjkl@cluster0-dlpiu.mongodb.net/test";
let dev_db_url = 'mongodb://localhost:27017/projectdb';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log('db server is up ');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/server', server);
app.use(express);


let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});