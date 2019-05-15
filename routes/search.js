var express = require('express')

var router = express.Router()
//mongoose models
var News = require('../models/mongooseModels/News')
var Category = require('../models/mongooseModels/Category')
//ejs models
var CategoryNewsList = require('../models/ejsModels/CategoryNewsList')
var RightNewsList = require('../models/ejsModels/RightNewsList');

router.get('/', async(req, res) => {
  const query = req.query;
  const keyWord = query.key;

  var [searchResult, newsList] = await Promise.all([
    News.find({ tags: { "$regex": keyWord, "$options": "i" } }).populate('category'),
    News.find()
  ])
  var start = searchResult.length-1;
  res.render('searchResult', {
    keyWord: keyWord,
    categoryNewsList: CategoryNewsList(searchResult, start, start+1, true),
    newestNewsList: RightNewsList(newsList, 8)
  })
})

router.post('/', (req, res) => {
  res.redirect('/search?key=' + req.body.keyword);
})

module.exports = router;

