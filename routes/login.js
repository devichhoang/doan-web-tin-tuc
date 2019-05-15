const express = require('express');
var router = express.Router();
var fs = require('fs');

var User = require("../models/mongooseModels/userAuthentication");
var news = require("../models/mongooseModels/News");
var category = require("../models/mongooseModels/Category");
const show = require("../models/ejsModels/showNewsAdmin");
const upload = require("../models/ejsModels/uploadMedia");
const showImage = require("../models/ejsModels/showImage");

const uploadImage = upload.single("image");

router.get('/', (req, res, next) => {
    res.render("./admin-dashboard/login", { error: 'Hello guys' });
})

router.post('/', (req, res, next) => {
    if (req.body.username && req.body.password) {
        User.authenticate(req.body.username, req.body.password, (err, user) => {
            if (err || !user) {
                res.render('./admin-dashboard/login', { error: 'Muốn hack trang tao hay gì' });
            } else {
                req.session.userId = user._id;
                return res.redirect('./admin');
            }
        });
    }
})

router.get('/admin', (req, res, next) => {

    User.findById(req.session.userId)
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    res.render('./admin-dashboard/login', { error: 'Chưa đăng nhập -> Muốn hack trang tui hay gì' });
                } else {
                    news.find()
                        .exec((err, data) => {
                            if (err) {
                                console.log(err);
                            } else if (data) {
                                console.log(data.length);
                                res.render("./admin-dashboard/dashboard", { listNews: show(data), total: data.length });
                            }
                        })
                }
            }
        })
})

router.get('/admin/edit', (req, res) => {
    User.findById(req.session.userId)
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    res.render('./admin-dashboard/login', { error: 'Chưa đăng nhập -> Muốn hack trang tao hay gì' });
                } else {
                    let news = {
                        title: "",
                        content: "",
                        url: "",
                        thumb: "",
                        isCarousel: "",
                        category: "",
                        tag: "",
                        description: ""
                    }
                    res.render("./admin-dashboard/edit", { news: news, showImage: showImage() });
                }
            }
        })
})

router.post('/admin/edit', async(req, res) => {
    if (req.body.title && req.body.content && req.body.category && req.body.image && req.body.url) {
        news.findOne({ title: req.body.title })
            .exec(async(err, data) => {
                console.log(typeof(req.body.isCarousel));
                const isCarousel = (req.body.isCarousel == "on") ? true : false;
                /*var isCarousel = false;
                if (req.body.isCarousel === "on") {
                    isCarousel = true;
                }*/

                console.log(req.body.category);
                const [categ] = await Promise.all([category.findOne({ title: req.body.category })]);
                console.log(categ);
                if (err) {
                    console.log(err);
                } else if (!data) {
                    let tin = new news({
                        title: req.body.title,
                        content: req.body.content,
                        url: req.body.url.split(" ").join("-"),
                        category: categ._id,
                        thumb: req.body.image,
                        isCarouselNews: isCarousel,
                        description: req.body.description,
                        tags: req.body.tags
                    });
                    tin.save()
                        .then(tin => console.log("add successfully"))
                } else {

                    data.title = req.body.title;
                    data.content = req.body.content;
                    data.url = req.body.url.split(" ").join("-");
                    data.isCarouselNews = isCarousel;
                    data.category = categ._id;
                    data.thumb = req.body.image;
                    data.description = req.body.description;
                    data.tags = req.body.tags;

                    data.save()
                        .then(res => console.log("update thanh cong"));
                }
            })


        res.redirect('back');
    } else {
        let news = {
            title: "",
            content: "",
            url: "",
            thumb: "",
            isCarousel: "",
            category: "",
            description: "",
            tags: ""
        }
        res.render("./admin-dashboard/edit", { news: news, showImage: showImage() });
    }

})

router.get('/admin/edit/:_id', (req, res) => {

    User.findById(req.session.userId)
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    res.render('login', { error: 'Chưa đăng nhập -> Muốn hack trang tui hay gì' });
                } else {
                    news.findById(req.params._id)
                        .exec((err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                let news = {
                                    title: "\"" + data.title + "\"",
                                    content: data.content,
                                    url: "\"" + data.url + "\"",
                                    thumb: "\"" + data.thumb + "\"",
                                    isCarousel: "\"" + data.isCarouselNews + "\"",
                                    category: data.category.title,
                                    description: "\"" + data.description + "\"",
                                    tags: "\"" + data.tags + "\""
                                }
                                console.log(category);
                                res.render('./admin-dashboard/edit', { news: news, showImage: showImage() });
                            }
                        })
                }
            }
        })


})
router.get('/admin/edit/delete/:_id', (req, res) => {
    User.findById(req.session.userId)
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    res.render('./admin-dashboard/login', { error: 'Chưa đăng nhập -> Muốn hack trang tao hay gì' });
                } else {
                    news.remove({
                        _id: req.params._id
                    }, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('../../');
                        }
                    })
                }
            }
        })
})

//upload image
router.get('/files', function(req, res) {
    fs.readdir('public/images', (err, images) => {
        var sorted = [];
        for (let item of images) {
            var s = item.split('.').pop().toLowerCase();
            if (s === 'png' || s === 'jpg' || s === 'svg') {
                var abc = {
                    "image": "/images/" + item,
                    "folder": "/"
                }
                sorted.push(abc);
            }
        }
        console.log(sorted);
        res.send(sorted);
    })
})

router.post('/admin/edit/upload', upload.array('flFileUpload', 12), function(req, res, next) {
    res.redirect('back')
});

router.post('/admin/edit/delete_file', function(req, res, next) {
        var url_del = 'public' + req.body.url_del;
        console.log(url_del);
        if (fs.existsSync(url_del)) {
            fs.unlinkSync(url_del);
        }
        res.redirect('back');
    })
    //close upload image

router.get('/admin/media', (req, res, next) => {
    User.findById(req.session.userId)
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    res.render('login', { error: 'Chưa đăng nhập -> Muốn hack trang tao hay gì' });
                } else {
                    res.render("./admin-dashboard/media", { showImage: showImage() });
                }
            }
        })
})

router.post('/admin/media/upload', (req, res, next) => {
    uploadImage(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('back');
        }
    })
})

router.get('/admin/category', (req, res, next) => {
    res.render('./admin-dashboard/addCategory', { title: "", url: "", showImage: showImage() })
})

router.get('/logout', (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            } else {
                res.redirect('../../');
            }
        });
    }
});



module.exports = router;