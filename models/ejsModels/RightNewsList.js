var result = (newsList, count) => {
    let start = newsList.length - 1;
	let end = (start + 1 - count < 0) ? 0 : start + 1 - count;
	if(start < 0 || count == 0) {return "";}
    else {
        var res = '';
        res += '<div class="right-news-item right-news-item-first">';
	    res += '<a href='+"/tintuc"+  newsList[start].url +'><img src='+ newsList[start].thumb +' alt="" width="100%" height="auto">';
	    res += '<b>'+ newsList[start].title +'</b></a>';
        res += '</div>';
        for(var i = start-1; i>=end; --i){
            res += '<hr>';
            res += '<div class="right-news-item right-news-item-first">';
            res += '<a href='+"/tintuc"+  newsList[i].url +'>';
            res += '<b>'+ newsList[i].title +'</b></a>';
            res += '</div>';
        }
        return res;
    }
}

module.exports = result;