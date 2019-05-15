var Category = require('../mongooseModels/Category');

var result = (category) => {
	if (!category.length) { return "<h5>Không có tin tức nào được tìm thấy</h5>"; }
	else {
		var res = '';
		var start;
		for (var j = 0; j < category.length; j++) {
			if (!category[j].length) continue;
			start = category[j].length - 1;
			res += '<br><div><div class="heading-news">';
			res += '<div class="category-container">';
			res += '<div class="category-title" style="font-size: 22px; display:inline;">Tin '
			res += category[j][0].category.title;
			res += '</div>';
			res += '<a href= "/category/' + category[j][0].category.link + '/trang-1">  >Xem toàn bộ</a></li>';
			res += '</div>';
			res += '<br></div><div class="row">';
			res += '<div class="col-lg-7 summary-highlight-news">';
			for (var i = start; i > start - 4; --i) {
				if (i < 0) break;
				res += '<article class="highlight-news" style="margin-bottom: 15px">';
				res += '<a href= ' + "/tintuc" + category[j][i].url + '>';
				res += '<img src=' + category[j][i].thumb + ' alt="tin seagame" class="img-highlight-news">';
				res += '</a>';
				res += '<a href=' + "/tintuc" + category[j][i].url + ' class="content-primary">';
				res += category[j][i].title;
				res += '</a>';
				res += '<time>' + category[j][i].createdAt + '</time>';
				res += '</article>';
			}
			res += '</div>';
			res += '<div class="col-lg-5 summary-highlight-news">';
			for (var i = start - 4; i > start - 6; --i) {
				if (i < 0) break;
				res += '<article class="highlight-news" style="margin-bottom: 15px">';
				res += '<a href= ' + "/tintuc" + category[j][i].url + '>';
				res += '<img src=' + category[j][i].thumb + ' alt="tin seagame" class="img-highlight-news">';
				res += '</a>';
				res += '<a href=' + "/tintuc" + category[j][i].url + ' class="content-primary">';
				res += category[j][i].title;
				res += '</a>';
				res += '<time>' + category[j][i].createdAt + '</time>';
				res += '</article>';
			}
			res += '</div></div>';
		}
		return res;
	}
}

module.exports = result;