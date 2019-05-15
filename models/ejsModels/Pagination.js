var result = (numberOfPages, pageNow) => {
    if(!numberOfPages) return '';
    else {
        var res = '<ul class="pagination justify-content-center">';
        res += (pageNow!=1)?'<li class="page-item"><a class="page-link" href="trang-'+ (pageNow-1) +'">Previous</a></li>':'<li class="page-item disabled"><a class="page-link" href="trang-'+ (pageNow-1) +'">Previous</a></li>';
        for(var i =1; i<=numberOfPages; i++){
            res += (i==pageNow)?'<li class="page-item disabled"><a class="page-link" href="trang-'+ i +'">' + i + '</a></li>':'<li class="page-item"><a class="page-link" href="trang-'+ i +'">' + i + '</a></li>';
        }
        res += (pageNow!=numberOfPages)?'<li class="page-item"><a class="page-link" href="trang-'+ pageNow+1 +'">Next</a></li>':'<li class="page-item disabled"><a class="page-link" href="trang-'+ pageNow+1 +'">Next</a></li>';
        res += '</ul>';
        return res;
    }
}
module.exports = result;