//////////////////////////////////////
//  `_______  `__   __  `_______    //  
//  |   __  \ |  | /  / |___   /    //  
//  |  |  \  \|  |/  /     /  /     //  
//  |  |  |  ||   _  \    /  /      //  
//  |  |__|  ||  | \  \  /  /____   //  
//  |________/|__|  \__\/________|  //  
//////////////////////////////////////
//  2016/01/28 by DKZ https://davidkingzyb.github.io
var resp;
var searchJson;
function getBlogJson(){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
			if(!resp){
				resp=xhr.responseText;
				searchJson=JSON.parse(resp);
				responseHandle(resp);
				
			}
		}else{
			console.log('fail'+xhr.status);
		}
	};
	xhr.open('get','blogJson.json',true);
	xhr.send(null);
}

function responseHandle(resp,isSearchReq){
	var respJson=JSON.parse(resp);
	respJson.blog.sort(function(a,b){
		return a.index-b.index;
	});
	if(!isSearchReq){
		respJson.blog.shift();
		respJson.blog.shift();
	}
	var innerbodyPane='<div id="bodyTitle"><h1>DKZ&apos;s blog</h1><hr></div>';
	while(respJson.blog.length!==0){
		var article=respJson.blog.pop();
		innerbodyPane=innerbodyPane+'<a href="blogmd/'+article.index+'.html">';
		innerbodyPane=innerbodyPane+'<article class="markdown-body"><h1>'+article.title+'</h1>';
		innerbodyPane=innerbodyPane+'<p><strong>'+article.info+'</strong></p>';
		innerbodyPane=innerbodyPane+'<p>'+article.key+'</p>';
		if(article.img!==''){
			innerbodyPane=innerbodyPane+'<p><img src="blogmd/'+article.img+'" style="max-width:100%;"></p>';
		}
		innerbodyPane=innerbodyPane+'</article></a>';
	}
	document.getElementById('bodyPane').innerHTML=innerbodyPane;
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

	
	getBlogJson();
	

	var searchbtn=document.getElementById("search");

	searchbtn.onclick=function(){
		var key=prompt('Search:').toLowerCase();
		var req={"blog":[]};
		for(var i=0;i<searchJson.blog.length;i++){
			if(searchJson.blog[i].info.toLowerCase().indexOf(key)!==-1||searchJson.blog[i].title.toLowerCase().indexOf(key)!==-1||searchJson.blog[i].key.toLowerCase().indexOf(key)!==-1){
				req.blog.push(searchJson.blog[i]);
			}
		}
		if(req.blog.length===0){
			req.blog.push(searchJson.blog[0]);
		}
		var reqStr=JSON.stringify(req);
		responseHandle(reqStr,true);
	};

	var footer=document.getElementById('footer');
	function showFooter(h){
		footer.style.height=h;
	}
	function hideFooter(h){
		footer.style.height=h;
	}
	if(window.innerWidth>=750){
		footer.onmouseover=function(){
			showFooter('100px');
		};
		footer.onmouseout=function(){
			hideFooter('20px');
		};
	}

	window.onscroll=function(){
		if(document.body.clientHeight-document.body.scrollTop-window.innerHeight<20){
			if(window.innerWidth>=750){
				footer.style.height='100px';
			}
		}else{
			if(window.innerWidth>=750){
				footer.style.height='20px';
			}
		}
	};

};


