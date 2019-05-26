var category = require('../mongooseModels/Category');
var news = require('../mongooseModels/News');

var countNews = async(categ_id) => {

    const [data] = await Promise.all([news.find()]);

    let count = 0;
    for (let i = 0; i < data.length; i++) {
        if (String(data[i].category._id) == String(categ_id)) {
            count++;
        }
    }
    return count;

}

var show = async(n) => {

    let count = 0;

    var kq = "<div class=\"container\">";
    for (let i = 0; i < n.length; i++) {

        await countNews(n[i]._id).then(rs => count = rs).catch(err => console.log(err));
        kq += "<div class=\"col-xl-6\" style=\"border:2px solid green;border-radius:15px;margin:10px\">";
        kq += "<h2 style=\"display:inline-block;\"><a href=\"./admin/category/" + String(n[i]._id) + "\">" + n[i].title + "</a></h2>";
        kq += "<span style=\"float:right;font-size:25px;\">" + count + " bài</span></div>";
    }
    kq += "</div>";
    return kq;

}

module.exports = show;