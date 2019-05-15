var Category = require('../mongooseModels/Category');

var result = (newsList, start, count, isInSearchPage) => {
	let end = (start + 1 - count < 0) ? 0 : start + 1 - count;
	if(newsList.length < 1) {return "<h5>Không có tin tức nào được tìm thấy</h5>";}
	else{
		var res = '';
		if(isInSearchPage){
			res += '<h5>Có '+ (start+1) +' kết quả được tìm thấy</h5>';
		}
		res += '<div id="bottom-news-list">';
		for(var i=start; i >= end; --i){
			res += '<article class="bottom-news">';
			res += '<a href=' +"/tintuc"+  newsList[i].url + ' class="bottom-news-img">';
			res += '<img src=' + newsList[i].thumb +' alt="tin seagame">';
			res += '</a>';
			res += '<div class="bottom-news-text">';
			res += '<a href=' + "/category/" + newsList[i].category.link + "/trang-1" + ' class="bottom-news-category"><p>Tin ' + newsList[i].category.title +'</p></a>';
			res += '<a href=' +"/tintuc"+  newsList[i].url + ' class="bottom-news-title"><p>'
			+ newsList[i].title +'</p></a>';
			res += '<time class="post-time">' + newsList[i].createdAt +'</time>';
			res += '<p class="desc">'+ newsList[i].description;
			res += '</p></div></article>';
		}
		res += '</div>';
		return res;
	}
}

module.exports = result;