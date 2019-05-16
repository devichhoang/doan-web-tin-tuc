var express = require('express');

var router = express.Router();
//mongoose models
var News = require('../models/mongooseModels/News');
var Category = require('../models/mongooseModels/Category');
//ejs models
var CategoryNewsList = require('../models/ejsModels/CategoryNewsList');
var RightNewsList = require('../models/ejsModels/RightNewsList');
var Pagination = require('../models/ejsModels/Pagination');

router.get('/tin-tuc-moi-nhat/trang-:page', (req, res) => {
    var pageNow = parseInt(req.params.page);

    News.find()
        .populate('category')
        .exec((err, newsList) => {
            var numberOfNews = 10; //Number of News in a page
            var start = newsList.length - numberOfNews * (pageNow - 1) - 1;
            var numberOfPages = parseInt(newsList.length / numberOfNews) + 1;
            res.render('category', {
                categoryTitle: 'tức mới nhất',
                categoryNewsList: CategoryNewsList(newsList, start, numberOfNews),
                newestNewsList: '',
                pagination: Pagination(numberOfPages, pageNow)
            })
        })
})

router.get('/:category/trang-:page', (req, res) => {
    var categoryLink = req.params.category;
    var pageNow = parseInt(req.params.page);

    News.findByCategoryLink(categoryLink, (err, categoryNewsList) => {
        News.find()
            .exec((err, newsList) => {
                var numberOfNews = 10; //Number of News in a page
                var start = categoryNewsList.length - numberOfNews * (pageNow - 1) - 1;
                var numberOfPages = parseInt(categoryNewsList.length / numberOfNews) + 1;
                if (start < 0) res.send('Không có trang này');
                res.render('category', {
                    categoryTitle: (categoryNewsList[0]==undefined)?'':categoryNewsList[0].category.title,
                    categoryNewsList: CategoryNewsList(categoryNewsList, start, numberOfNews),
                    newestNewsList: RightNewsList(newsList, 6),
                    pagination: Pagination(numberOfPages, pageNow)
                })
            })
    })
})

module.exports = router;