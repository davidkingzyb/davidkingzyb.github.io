//////////////////////////////////////
//  `_______  `__   __  `_______    //  
//  |   __  \ |  | /  / |___   /    //  
//  |  |  \  \|  |/  /     /  /     //  
//  |  |  |  ||   _  \    /  /      //  
//  |  |__|  ||  | \  \  /  /____   //  
//  |________/|__|  \__\/________|  //  
//////////////////////////////////////
//  2016/01/28 by DKZ https://davidkingzyb.github.io

var searchArr=[];

function getSearchArr(){
	var anchor=document.querySelectorAll(".anchor");
	for(var i=0;i<anchor.length;i++){
		searchArr.push(anchor[i].href.split('#')[1]);
	}
}

function searchAnchor(key){
	for(var i=0;i<searchArr.length;i++){
		if(searchArr[i].indexOf(key)!==-1){
			return i;
		}
	}
	return -1;
}

function wrapCode(){
	var wrap=document.getElementsByTagName('code');
	for(var i=0;i<wrap.length;i++){
		if(wrap[i].outerHTML){
			wrap[i].outerHTML='<pre>'+wrap[i].outerHTML+'</pre>';
		}else{
			var tmp = document.createElement('pre');
    		tmp.appendChild(wrap.cloneNode(true));
    		wrap.parentNode.replaceChild(tmp, wrap);
		}
	}
}

window.onload=function(){
	
	var canvas=document.getElementById("dkzlogo");
	var context=canvas.getContext('2d');
	var DKZlogo=new DKZLogoClass(context,15);
	DKZlogo.drawDKZ('stroke');
	setTimeout(DKZlogo.animateDKZ(),2000);
	canvas.onclick=function(){
		DKZlogo.fillrandomDKZ();
	};

	getSearchArr();

	var searchbtn=document.getElementById("search");

	searchbtn.onclick=function(){
		var key=encodeURI(prompt('Search:')).toLowerCase();
		var index=searchAnchor(key);
		window.scrollTo(0,document.getElementsByClassName('anchor')[index].getBoundingClientRect().top+document.body.scrollTop);
	};

	var footer=document.getElementById('footer');
	if(window.innerWidth>=750){
		footer.onmouseover=function(){
			footer.style.height='100px';
		};
		footer.onmouseout=function(){
			if(document.body.clientHeight-document.body.scrollTop-window.innerHeight>40){
				footer.style.height='20px';
			}
		};
	}

	window.onscroll=function(){
		if(document.body.clientHeight-document.body.scrollTop-window.innerHeight<40){
			if(window.innerWidth>=750){
				footer.style.height='100px';
			}
		}else{
			if(window.innerWidth>=750){
				footer.style.height='20px';
			}
		}
	};

	var pathname=window.location.pathname.substring(1);
	var threadkey=pathname.split('.')[0];
	var url=window.location.href;
	var dsstr='<div class="ds-thread" data-thread-key="'+threadkey+'" data-title="'+pathname+'" data-url="'+url+'"></div>';
	document.getElementById('discusspane').innerHTML=dsstr;

	wrapCode();
};
