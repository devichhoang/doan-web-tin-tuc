var result = (categories) => {
    if(categories.length < 1) return "";
    else {
            var res = '';
            for(var i=0 ;i< categories.length; i++){
            res += '<li><span style="z-index:1000">';
            res += categories[i].title;
            res += '</span>';
            res += '<a href= "/category/' + categories[i].link + '/trang-1"><img src=' + categories[i].imgUrl +'></a></li>';
        }
        return res;
    }
}
module.exports = result;