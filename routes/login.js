const express = require('express');
var router = express.Router();
var fs = require('fs');

var User = require("../models/mongooseModels/userAuthentication");
var news = require("../models/mongooseModels/News");
var category = require("../models/mongooseModels/Category");
const showNews = require("../models/ejsModels/showNewsAdmin");
const showCategory = require("../models/ejsModels/showCategoryAdmin");
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
                res.render('./admin-dashboard/login', { error: 'Muốn hack trang tui hay gì' });
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
                    category.find()
                        .exec(async(err, data) => {
                            if (err) {
                                console.log(err);
                            } else if (data) {
                                var list;
                                await showCategory(data).then(rs => list = rs).catch(err => console.log(err));
                                res.render("./admin-dashboard/dashboard", { listNews: list });
                            }
                        })
                }
            }
        })

})

router.get('/admin/category/:_id', (req, res, next) => {
    User.findById(req.session.userId)
        .exec((err, user) => {
            if (!user) {
                res.render('./admin-dashboard/login', { error: 'Chưa đăng nhập -> Muốn hack trang tui hay gì' });
            } else {
                news.find()
                    .exec((err, data) => {
                        res.render("./admin-dashboard/dashboard", { listNews: showNews(data, req.params._id) });
                    })
            }
        })
})

//trang thêm - chỉnh sửa bài viết
router.get('/admin/edit', (req, res) => {
    User.findById(req.session.userId)
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else {
                if (!user) {
                    res.render('./admin-dashboard/login', { error: 'Chưa đăng nhập -> Muốn hack trang tui hay gì' });
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
                const isCarousel = (req.body.isCarousel == "on") ? true : false;
                const [categ] = await Promise.all([category.findOne({ title: req.body.category })]);
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
                    res.render('./admin-dashboard/login', { error: 'Chưa đăng nhập -> Muốn hack trang tui hay gì' });
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

//upload image ckeditor
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
        res.send(sorted);
    })
})

router.post('/admin/edit/upload', upload.array('flFileUpload', 12), function(req, res, next) {
    res.redirect('back')
});

router.post('/admin/edit/delete_file', function(req, res, next) {
        var url_del = 'public' + req.body.url_del;
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
                    res.render('login', { error: 'Chưa đăng nhập -> Muốn hack trang tui hay gì' });
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

//Thêm Danh mục
router.get('/admin/category', (req, res, next) => {
    res.render('./admin-dashboard/addCategory', { title: "", url: "", image: "", showImage: showImage() })
})

router.post('/admin/category', (req, res, next) => {
    if (req.body.title && req.body.url && req.body.image) {
        category.findOne({ title: req.body.title })
            .exec((err, data) => {

                if (err) {
                    console.log(err);
                } else if (!data) {
                    let categ = new category({
                        title: req.body.title,
                        imgUrl: req.body.image,
                        url: req.body.url.split(" ").join("-"),
                    });
                    categ.save()
                        .then(tin => console.log("add successfully"))
                } else {

                    data.title = req.body.title;
                    data.imgUrl = req.body.url;
                    data.url = req.body.url.split(" ").join("-");
                    data.save()
                        .then(res => console.log("update thanh cong"));
                }
            })


        res.redirect('back');
    } else {
        res.render("./admin-dashboard/addCategory", {
            title: "",
            url: "",
            image: "",
            showImage: showImage()
        });
    }
})


//Đăng xuất
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