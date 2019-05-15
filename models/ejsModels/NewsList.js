var result = (newsList, count) => {
	let start = newsList.length - 1;
	let end = (start + 1 - count < 0) ? 0 : start + 1 - count;
	if(start < 0) {return "";}
    else {var res = '';
		for(var i = start; i>=end; --i){
			res += '<article class="highlight-news">';
			res += '<a href= ' +"/tintuc"+  newsList[i].url + '>';	
			res += '<img src=' + newsList[i].thumb + ' alt="tin seagame" class="img-highlight-news">';
			res += '</a>';
			res += '<a href=' +"/tintuc"+  newsList[i].url + ' class="content-primary">';
			res += newsList[i].title;
			res += '</a>';
			res += '<time>' + newsList[i].createdAt + '</time>';
			res += '</article>';
		}
		return res;
	}
}

module.exports = result;