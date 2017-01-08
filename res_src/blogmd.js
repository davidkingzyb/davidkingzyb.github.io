//////////////////////////////////////
//  `_______  `__   __  `_______    //  
//  |   __  \ |  | /  / |___   /    //  
//  |  |  \  \|  |/  /     /  /     //  
//  |  |  |  ||   _  \    /  /      //  
//  |  |__|  ||  | \  \  /  /____   //  
//  |________/|__|  \__\/________|  //  
//////////////////////////////////////
//  2016/01/28 by DKZ https://davidkingzyb.github.io

function wrapCodePre(){
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

//dkzlogo

(function(){
	var canvas=document.getElementById("dkzlogo");
	var context=canvas.getContext('2d');
	var DKZlogo=new DKZLogoClass(context,15);
	DKZlogo.drawDKZ('stroke');
	setTimeout(DKZlogo.animateDKZ(),2000);
	canvas.onclick=function(){
		DKZlogo.fillrandomDKZ();
	};
})();

window.onload=function(){
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

	wrapCodePre();
};