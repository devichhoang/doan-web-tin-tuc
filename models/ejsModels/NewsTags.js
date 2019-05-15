var StringtoTagList = require('./stringtoTagList');

var result = (tags) => {
    var tagList = StringtoTagList(tags);
    if (tagList.length < 1) return "";
    else {
        var res = '<p class="tag-list">';
        for (var i = 0; i < tagList.length; i++) {
            res += '<a href=' + "/search?key=" + tagList[i].slice(1) + '>' + tagList[i] + '</a>';
        }
        res += '</p>';
        return res;
    }
}

module.exports = result;