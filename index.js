const express = require('express');
const { mongooseConnection } = require('./services/mongo');
const routes = require('./routes');
require('dotenv').config();

// Creating Express app
const app = express();

// Middlewares
app.use(express.json());

// Mongo Connection
mongooseConnection().then((e) => console.log("MongoDB Connected!"));

// Routes
app.get('/', (req, res) => {
    res.json({ 'msg': 'SUCCESS' });
});

app.use(routes);


const PORT = 3000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));