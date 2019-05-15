function getminimize() {
    var leftnav = document.getElementById('left-nav'),
        topnav = document.getElementById('top-nav'),
        main = document.getElementById('main'),
        maximize = document.getElementById('maximize');

    leftnav.style.left = '-200px';
    topnav.style.left = '0px';
    topnav.style.width = '100%';
    main.style.left = '0px';
    main.style.width = '100%';
    maximize.style.display = 'block';

}

function getmaximize() {
    var leftnav = document.getElementById('left-nav'),
        topnav = document.getElementById('top-nav'),
        main = document.getElementById('main');
    maximize = document.getElementById('maximize');

    leftnav.style.left = '0px';
    topnav.style.left = '200px';
    topnav.style.width = '100% - 200px';
    main.style.left = '200px';
    main.style.width = 'calc(100% - 200px)';
    maximize.style.display = 'none';
}

/*var addnews_action = document.getElementById('addNews-action'),
	home_action=document.getElementById('home-action');
	addnews_action.style.display='none';
	home_action.style.display='block';

var actions = [home_action,addnews_action];

function show(index){
	for(var i=0;i<actions.length;i++){
		if(i!==index){
			actions[i].style.display='none';
		}else{
			actions[i].style.display='block';
		}
	}
}



var addnews = document.getElementById('addnews'),
	home = document.getElementById('home');

var buttons = [home,addnews];
buttons[0].addEventListener('click',function(){show(0)},false);
buttons[1].addEventListener('click',function(){show(1)},false);
*/