const category = require("../mongooseModels/Category");
var show = (data) => {
    let kq = "<div class=\"form-group\">"
        /* category.find()
             .exec((err, data) => {
                 
                     console.log(data[i].title);
                 }

             })*/
        //const [data] = await new Promise.all([category.find()]);
    kq += "<label for=\"category\">Thể loại</label>";
    kq += "<select class=\"form-control\" id=\"category\" name=\"category\">"
    for (let i = 0; i < data.length; i++) {
        kq += "<option value=\"" + data[i].title + "\">" + data[i].title + "</option>";

        console.log(kq);
    }
    kq += "</select></div>";
    return kq;
}

module.exports = show;