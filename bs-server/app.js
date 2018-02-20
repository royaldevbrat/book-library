const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const redis = require('redis');
const cron = require('node-cron');
const mongoose = require('mongoose');
const fs = require('fs');
const app = require('express')();
const config = require('./config/database');
const Book = require('./models/book');
// Connect To Database
mongoose.connect(config.dbUrl+config.dbName);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB');
  Book.checkForDB();
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const users = require('./routes/users');
const books = require('./routes/books');
const files = require('./routes/files');
// Port Number
const NODE_PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/img', express.static(path.join(__dirname, 'public/images')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/books', books);
app.use('/api/sendfiles', files);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// app.get('*', (req, res) => {
//   console.log(req);
//   console.log("error");
// });

// Start Server
app.listen(NODE_PORT, () => {
  console.log('Node Server started');
});
const client = redis.createClient(REDIS_PORT);

client.on('connect', function() {
  console.log('Redis client is connected');
});

// To store top 5 books on every monday in redis
cron.schedule('5 0 * * 1', function(){ 
  client.exists('topsearched', function(err, reply) {
    if (reply === 1) {
      client.del('topsearched', function(err, reply) {
        Book.getTopFiveSearchedBooks(function (err, books) {
          if (err) {
            
          } else {
            client.set('topsearched', JSON.stringify(books));
          }
        });
      });
    } else {
      Book.getTopFiveSearchedBooks(function (err, books) {
        if (err) {
          
        } else {
          client.set('topsearched', JSON.stringify(books));
        }
      });
    }
  });
});

// To get top 5 books from redis
app.get('/api/cashe/fetchTopAllBooks', function(req, res) {
  client.get('topsearched', function (err, data) {
      if (err) throw err;
      if (data != null) {
          res.json({"books": JSON.parse(data)});
      } else {
        Book.getTopFiveSearchedBooks(function (err, books) {
          if (err) {
            
          } else {
            client.set('topsearched', JSON.stringify(books));
            client.get('topsearched', function (err, data1) {
                if (err) throw err;
                res.json({"books":  JSON.parse(data1)});
            });
          }
        });
      }
  });
});
