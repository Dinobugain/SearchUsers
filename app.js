const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    cors = require('cors'),
    database = require('./services/database.service'),
    path = require('path');

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use('/api/users', require('./routes/users.router'))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });
module.exports = server;