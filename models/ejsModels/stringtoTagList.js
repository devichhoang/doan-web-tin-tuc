module.exports = function StringtoTagList(tags) {
    var str = tags + '';
    return str.split(',');
}