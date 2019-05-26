var express = require('express')

var router = express.Router()
var News = require('../models/mongooseModels/News')
var Category = require('../models/mongooseModels/Category')
    //ejs-models
var CarouselNews = require('../models/ejsModels/CarouselNews')
var CategoryList = require('../models/ejsModels/CategoryList')
var NewsList = require('../models/ejsModels/NewsList')
var CategoryNewsList = require('../models/ejsModels/CategoryNewsList')
var IndexCategoryNewsList = require('../models/ejsModels/IndexCategoryNewsList')
var RightNewsList = require('../models/ejsModels/RightNewsList')
var NewsTags = require('../models/ejsModels/NewsTags')

/* GET home page. */
router.get('/', async(req, res, next) => {
    var [newsList, carouselNewsList, categories] = await Promise.all([
        News.find(),
        News.find({ isCarouselNews: true }),
        Category.find()
    ]);
    var categoryPromise = [];
    for (var i = 0; i < categories.length; i++) {
        categoryPromise[i] = News.getNewsByCategoryId(categories[i]._id);
    }
    var newsCategoryList = await Promise.all(categoryPromise);
    res.render('index', {
        title: 'Tin bóng đá',
        CategoryList: CategoryList(categories),
        NewestNewsList: NewsList(newsList, 4),
        IndexCategoryNewsList: IndexCategoryNewsList(newsCategoryList),
        carousel: CarouselNews(carouselNewsList)
    })
})

//reading Page
router.get('/tintuc/:url', async(req, res) => {
    var newsUrl = '/' + req.params.url
    var [newsList, news] = await Promise.all([
        News.find().populate('category'),
        News.findOne({ url: newsUrl }).populate('category')
    ]);
    if (news) {
        news.views = news.views + 1;
        news.save()
            .then(() => console.log("tang view thanh cong"));
    }
    res.render('readPage', {
        title: news.title,
        category: news.category.title,
        newsContent: news.content,
        bottomNewsList: CategoryNewsList(newsList, newsList.length - 1, 6),
        relateNewsList: RightNewsList(newsList, 6),
        newestNewsList: RightNewsList(newsList, 6),
        tags: NewsTags(news.tags)
    })
})

module.exports = router