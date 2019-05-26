var fs = require('fs');

var showImage = () => {

    const images = fs.readdirSync('public/images');
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

    // console.log(images);
    //console.log(sorted);

    var show = "<div>";
    for (let i = 0; i < sorted.length; i++) {
        show = show + "<img class=\"img-media\" src=\"" + sorted[i].image + "\" onclick=\"image(this)\"/>";
    }
    show += "</div>"
    return show;

}

module.exports = showImage;