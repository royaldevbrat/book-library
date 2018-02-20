const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Book = require('../models/book');

router.post('/addNewBook', (req, res, err) => {
  let isCover;
  let imgLink;
  if(req.body.imageLink){
    isCover = true;
    imgLink = req.body.imageLink;
  } else{
    isCover = false;
    imgLink = "";
  }
  
  const newBook = new Book({
    author: req.body.author,
    imageLink: imgLink,
    language: req.body.language,
    pages: req.body.pages,
    title: req.body.title,
    isCoverAvailable: isCover,
    addedBy:  req.body.addedBy,
    year: req.body.year
  });
  Book.addNewBook(newBook, (err, book) => {
    if (err) {
      res.json({ "success": false, "message": "unable to add" });
    } else {
      res.json({ "success": true, "book": book });
    }
  });
});

router.get('/fetchAllBooks', (req, res, next) => {
  Book.getAllBook((err, books) => {
    if (err) {
      res.json({ "success": false, "message": 'Unable to get book' });
    } else {
      res.json({ "success": true, "books": books });
    }
  });
});

router.post('/searchInAllBooks', (req, res, next) => {
  Book.searchForBook(req, (err, books) => {
    if (err) {
      res.json({ "success": false, "message": 'Unable to get book' });
    } else {
      res.json({ "success": true, "books": books });
    }
  });
});


router.get('/increaseCounter/:id', function (req, res) {
  Book.increaseSearchCounter(req.params.id, function (err, result) {
      if (err) {
        console.log(err);
        res.json({ "success": false });
      } else {
        res.json({ "success": true });
      }
    })
});

router.post('/updateBook', function (req, res) {
  Book.updateOneBook(req, (err, result) => {
    if (err) {
      res.json({ "success": false, "message": "unable to update" });
    } else {
      res.json({ "success": true, "data": result });
    }
  });
});

router.get('/deletebook/:id', function (req, res) {
  Book.deleteOneBook(req.params.id, function (err, result) {
      if (err) {
        console.log(err);
        res.json({ "success": false });
      } else {
        res.json({ "success": true });
      }
    })
});


module.exports = router;
