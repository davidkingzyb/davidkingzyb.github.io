var DKZLogoClass=(function(){
	function DKZLogoClass(context,scale){
		this.context=context;
		this.w=Math.sqrt(3)*scale;
		this.h=scale;
	}

	var d={};

	d.drawWhite1=function(context,w,h){
		context.moveTo(1*w,7*h);
		context.lineTo(1*w,15*h);
		context.lineTo(2*w,16*h);
		context.lineTo(2*w,8*h);
		context.lineTo(1*w,7*h);
	}
	d.drawWhite2=function(context,w,h){
		context.moveTo(1*w,7*h);
		context.lineTo(3*w,5*h);
		context.lineTo(3*w,7*h);
		context.lineTo(2*w,8*h);
		context.lineTo(1*w,7*h);
	}

	d.drawWhite3=function(context,w,h){
		context.moveTo(3*w,5*h);
		context.lineTo(3*w,7*h);
		context.lineTo(4*w,6*h);
		context.lineTo(3*w,5*h);
	}
	d.drawWhite4=function(context,w,h){
		context.moveTo(4*w,6*h);
		context.lineTo(3*w,7*h);
		context.lineTo(4*w,8*h);
		context.lineTo(4*w,6*h);
	}
	d.drawWhite5=function(context,w,h){
		context.moveTo(4*w,6*h);
		context.lineTo(5*w,7*h);
		context.lineTo(4*w,8*h);
		context.lineTo(4*w,6*h);
	}
	d.drawWhite6=function(context,w,h){
		context.moveTo(5*w,7*h);
		context.lineTo(4*w,8*h);
		context.lineTo(4*w,12*h);
		context.lineTo(5*w,11*h);
		context.lineTo(5*w,7*h);
	}
	d.drawWhite7=function(context,w,h){
		context.moveTo(4*w,12*h);
		context.lineTo(3*w,13*h);
		context.lineTo(4*w,14*h);
		context.lineTo(4*w,12*h);
	}
	d.drawWhite8=function(context,w,h){
		context.moveTo(4*w,14*h);
		context.lineTo(2*w,16*h);
		context.lineTo(2*w,8*h);
		context.lineTo(3*w,7*h);
		context.lineTo(4*w,8*h);
		context.lineTo(3*w,9*h);
		context.lineTo(3*w,13*h);
		context.lineTo(4*w,14*h);
	}
	d.drawWhite9=function(context,w,h){
		context.moveTo(4*w,12*h);
		context.lineTo(5*w,13*h);
		context.lineTo(5*w,11*h);
		context.lineTo(4*w,12*h);
	}
	d.drawWhite10=function(context,w,h){
		context.moveTo(4*w,4*h);
		context.lineTo(5*w,5*h);
		context.lineTo(5*w,7*h);
		context.lineTo(4*w,6*h);
		context.lineTo(4*w,4*h);
	}
	d.drawWhite11=function(context,w,h){
		context.moveTo(4*w,4*h);
		context.lineTo(5*w,3*h);
		context.lineTo(6*w,4*h);
		context.lineTo(5*w,5*h);
		context.lineTo(4*w,4*h);
	}
	d.drawWhite12=function(context,w,h){
		context.moveTo(5*w,5*h);
		context.lineTo(6*w,4*h);
		context.lineTo(6*w,6*h);
		context.lineTo(7*w,5*h);
		context.lineTo(7*w,7*h);
		context.lineTo(8*w,6*h);
		context.lineTo(8*w,10*h);
		context.lineTo(7*w,11*h);
		context.lineTo(7*w,9*h);
		context.lineTo(6*w,10*h);
		context.lineTo(6*w,12*h);
		context.lineTo(5*w,13*h);
		context.lineTo(5*w,5*h);
	}
	d.drawWhite13=function(context,w,h){
		context.moveTo(6*w,2*h);
		context.lineTo(7*w,1*h);
		context.lineTo(8*w,2*h);
		context.lineTo(7*w,3*h);
		context.lineTo(6*w,2*h);
	}
	d.drawWhite14=function(context,w,h){
		context.moveTo(7*w,3*h);
		context.lineTo(8*w,2*h);
		context.lineTo(8*w,4*h);
		context.lineTo(7*w,5*h);
		context.lineTo(7*w,3*h);
	}
	d.drawWhite15=function(context,w,h){
		context.moveTo(8*w,2*h);
		context.lineTo(9*w,1*h);
		context.lineTo(12*w,4*h);
		context.lineTo(11*w,5*h);
		context.lineTo(8*w,2*h);
	}
	d.drawWhite16=function(context,w,h){
		context.moveTo(12*w,4*h);
		context.lineTo(12*w,8*h);
		context.lineTo(11*w,7*h);
		context.lineTo(11*w,5*h);
		context.lineTo(12*w,4*h);
	}
	d.drawWhite17=function(context,w,h){
		context.moveTo(12*w,8*h);
		context.lineTo(11*w,9*h);
		context.lineTo(11*w,7*h);
		context.lineTo(12*w,8*h);
	}
	d.drawWhite18=function(context,w,h){
		context.moveTo(11*w,9*h);
		context.lineTo(10*w,8*h);
		context.lineTo(11*w,7*h);
		context.lineTo(11*w,9*h);
	}
	d.drawWhite19=function(context,w,h){
		context.moveTo(10*w,8*h);
		context.lineTo(11*w,7*h);
		context.lineTo(11*w,5*h);
		context.lineTo(8*w,2*h);
		context.lineTo(8*w,4*h);
		context.lineTo(10*w,6*h);
		context.lineTo(10*w,8*h);
	}
	d.drawWhite20=function(context,w,h){
		context.moveTo(8*w,6*h);
		context.lineTo(8*w,10*h);
		context.lineTo(11*w,13*h);
		context.lineTo(11*w,11*h);
		context.lineTo(10*w,10*h);
		context.lineTo(10*w,8*h);
		context.lineTo(8*w,6*h);
	}
	d.drawWhite21=function(context,w,h){
		context.moveTo(11*w,13*h);
		context.lineTo(12*w,12*h);
		context.lineTo(12*w,10*h);
		context.lineTo(11*w,11*h);
		context.lineTo(11*w,13*h);
	}
	d.drawBlack5=function(context,w,h){
		context.moveTo(12*w,10*h);
		context.lineTo(11*w,11*h);
		context.lineTo(10*w,10*h);
		context.lineTo(11*w,9*h);
		context.lineTo(12*w,10*h);
	}
	d.drawBlack4=function(context,w,h){
		context.moveTo(9*w,5*h);
		context.lineTo(8*w,6*h);
		context.lineTo(10*w,8*h);
		context.lineTo(10*w,6*h);
		context.lineTo(9*w,5*h);
	}
	d.drawBlack1=function(context,w,h){
		context.moveTo(3*w,11*h);
		context.lineTo(4*w,12*h);
		context.lineTo(3*w,13*h);
		context.lineTo(3*w,11*h);
	}
	d.drawBlack2=function(context,w,h){
		context.moveTo(6*w,4*h);
		context.lineTo(7*w,5*h);
		context.lineTo(6*w,6*h);
		context.lineTo(6*w,4*h);
	}
	d.drawBlack3=function(context,w,h){
		context.moveTo(7*w,5*h);
		context.lineTo(8*w,6*h);
		context.lineTo(7*w,7*h);
		context.lineTo(7*w,5*h);
	}
	d.drawGrey1=function(context,w,h){
		context.moveTo(4*w,8*h);
		context.lineTo(4*w,12*h);
		context.lineTo(3*w,11*h);
		context.lineTo(3*w,9*h);
		context.lineTo(4*w,8*h);		
	}
	d.drawGrey2=function(context,w,h){
		context.moveTo(6*w,10*h);
		context.lineTo(7*w,9*h);
		context.lineTo(7*w,11*h);
		context.lineTo(6*w,10*h);
	}
	d.drawGrey3=function(context,w,h){
		context.moveTo(6*w,2*h);
		context.lineTo(6*w,4*h);
		context.lineTo(7*w,5*h);
		context.lineTo(7*w,3*h);
		context.lineTo(6*w,2*h);
	}
	d.drawGrey4=function(context,w,h){
		context.moveTo(11*w,9*h);
		context.lineTo(10*w,10*h);
		context.lineTo(10*w,8*h);
		context.lineTo(11*w,9*h);
	}
	function fillDKZ(context,color){
		context.closePath();
		context.fillStyle=color;
		context.fill();
		context.lineWidth=1;
		context.strokeStyle='#000000';
		context.stroke();
		context.beginPath();
		
	}
	

	DKZLogoClass.prototype.drawDKZ=function(mood){
		var context=this.context;
		var h=this.h;
		var w=this.w;
		context.beginPath();

		for(var i=1;i<=21;i++){
			d['drawWhite'+i](context,w,h);
		}
		
		context.closePath();

		if(mood==='fill'){
			
			context.fillStyle='#cccccc';
			context.fill();
			context.lineWidth=1;
			context.strokeStyle='#000000';
			context.stroke();
		}
		if(mood==='stroke'){
			context.lineWidth=1;
			context.strokeStyle='#ffffff';
			context.stroke();
		}

		context.beginPath();

		for(var j=1;j<=5;j++){
			d['drawBlack'+j](context,w,h);
		}		

		context.closePath();

		if(mood==='fill'){
			
			context.fillStyle='#222222';
			context.fill();
			context.lineWidth=1;
			context.strokeStyle='#000000';
			context.stroke();
		}
		if(mood==='stroke'){
			context.lineWidth=1;
			context.strokeStyle='#ffffff';
			context.stroke();
		}

		context.beginPath();

		for(var k=1;k<=4;k++){
			d['drawGrey'+k](context,w,h);
		}
		

		context.closePath();

		if(mood==='fill'){
			
			context.fillStyle='#777777';
			context.fill();
			context.lineWidth=1;
			context.strokeStyle='#000000';
			context.stroke();
		}

		if(mood==='stroke'){
			context.lineWidth=1;
			context.strokeStyle='#ffffff';
			context.stroke();
		}
		
	}
	DKZLogoClass.prototype.animateDKZ=function(){
		var context=this.context;
		var h=this.h;
		var w=this.w;
		context.beginPath();
		var i=1;
		function loop(){
			d['drawWhite'+i](context,w,h);
			fillDKZ(context,'#cccccc');
			i++;
			if(i<=21){
				setTimeout(arguments.callee,100);
			}
		}
		loop();

		var j=1;
		function loop2(){
			d['drawGrey'+j](context,w,h);
			fillDKZ(context,'#777777');
			j++;
			if(j<=4){
				setTimeout(arguments.callee,700);
			}
		}
		loop2();

		var k=1;
		function loop3(){
			d['drawBlack'+k](context,w,h);
			fillDKZ(context,'#222222');
			k++;
			if(k<=5){
				setTimeout(arguments.callee,550);
			}
		}
		loop3();
		

	}
	return DKZLogoClass;

})();
var resp;
function getBlogJson(){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
			if(!resp){
				resp=xhr.responseText;
				responseHandle(resp);
			}
		}else{
			console.log('fail'+xhr.status);
		}
	}
	xhr.open('get','blogJson.json',true);
	xhr.send(null);
}
function responseHandle(resp){
	var respJson=JSON.parse(resp);
	var innerbodyPane='<div id="bodyTitle"><h1>DKZ\'s blog</h1><hr></div>'
	while(respJson.blog.length!==0){
		var article=respJson.blog.pop();
		innerbodyPane=innerbodyPane+'<a href="blogmd/'+article.index+'.html">'
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
	getBlogJson();

	var canvas=document.getElementById("dkzlogo");
	var context=canvas.getContext('2d');
	var DKZlogo=new DKZLogoClass(context,15);
	DKZlogo.drawDKZ('stroke');
	setTimeout(DKZlogo.animateDKZ(),2000);


}

