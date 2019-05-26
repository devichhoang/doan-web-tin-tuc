var news = require("../mongooseModels/News");
var show = (n, cate_id) => {
    var kq = '';
    for (let i = n.length - 1; i >= 0; i--) {
        if (String(n[i].category._id) === cate_id) {
            kq += "<div class=\"child_static_table\">";
            kq += "<div class=\"title_static_table\">";
            kq += n[i].title;
            kq += "<div style=\"display:inline-block;float:right;margin-right:5px;\">"
            kq += "<i class=\"fas fa-eye\" style=\"margin-right:5px;\"></i>";
            kq += n[i].views;
            kq += "</div>"
            kq += "</div>";
            kq = kq + ("<button class=\"btn btn-outline-secondary btn-edit\"><a href=\"/login/admin/edit/" + n[i]._id + "\" data_method=\"post\">Chỉnh sửa</a></button>");
            kq = kq + ("<button class=\"btn btn-outline-secondary btn-edit\"><a href=\"/login/admin/edit/delete/" + n[i]._id + "\">Xóa</a></button>");
            kq += "</div>";
        }
    }
    return kq;
}

module.exports = show;