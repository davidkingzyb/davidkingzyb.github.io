//////////////////////////////////////
//  `_______  `__   __  `_______    //  
//  |   __  \ |  | /  / |___   /    //  
//  |  |  \  \|  |/  /     /  /     //  
//  |  |  |  ||   _  \    /  /      //  
//  |  |__|  ||  | \  \  /  /____   //  
//  |________/|__|  \__\/________|  //  
//////////////////////////////////////
//  2016/01/28 by DKZ https://davidkingzyb.github.io

window.onload = function() {
	fullPage();
	var canvas = document.getElementById("dkzlogo");
	var context = canvas.getContext('2d');
	var DKZlogo = new DKZLogoClass(context, 30);
	DKZlogo.drawDKZ('stroke');
	setTimeout(DKZlogo.animateDKZ(), 2000);
	canvas.onclick = function(e) {
		DKZlogo.fillrandomDKZ();
	};
	if (navigator.userAgent.toLowerCase().indexOf('mobile') === -1) {
		rotateCube();
	} else {
		showSkillTree();
		showTimeLine();
	}
};

//===============full page===========

var conY; //con y coodination array
function setHomeWH() {
	var homecon = document.getElementById('homecon');
	var skillcon = document.getElementById('skillcon');
	var expcon = document.getElementById('expcon');
	var contactcon = document.getElementById('contactcon');

	homecon.style.width = '100%';
	homecon.style.height = window.innerHeight + 'px';
	homecon.style.backgroundColor = '#222';

	skillcon.style.width = '100%';
	skillcon.style.height = window.innerHeight + 'px';
	skillcon.style.backgroundColor = '#eee';

	expcon.style.width = '100%';
	expcon.style.height = window.innerHeight + 'px';
	expcon.style.backgroundImage = 'url(res/img/CUBEx3.jpg)';

	contactcon.style.width = '100%';
	contactcon.style.height = window.innerHeight + 'px';
	contactcon.style.backgroundColor = '#222';

	var homeconY = homecon.getBoundingClientRect().top + document.body.scrollTop;
	var skillconY = skillcon.getBoundingClientRect().top + document.body.scrollTop;
	var expconY = expcon.getBoundingClientRect().top + document.body.scrollTop;
	var contactconY = contactcon.getBoundingClientRect().top + document.body.scrollTop;

	conY = [homeconY, skillconY, expconY, contactconY];
}

function fullPage() {
	setHomeWH();
	var navul = document.getElementById('navul');

	var nowCon = 0; //con index
	setNowCon(nowCon);
	window.scrollTo(0, 0);

	//if contact
	if (window.location.hash === '#contact') {
		nowCon = 3;
		var toY = conY[nowCon];
		scrollToAnimate(toY, function() {
			setNowCon(nowCon);
		});
	}



	//bind
	var prevY = 0;
	if (navigator.userAgent.toLowerCase().indexOf('mobile') === -1) {
		navul.onclick = function(e) {
			nowCon = Number(e.target.id.substring(3));
			var toY = conY[nowCon];
			startScroll(nowCon);
			scrollToAnimate(toY, function() {
				setNowCon(nowCon);
			});
		}
		window.onscroll = function(e) {
			var nowY = document.documentElement.scrollTop + document.body.scrollTop;
			if (nowY > prevY && !isscrolling) {
				if (nowCon < 3) {
					nowCon++;
					startScroll(nowCon);
					scrollToAnimate(conY[nowCon], function() {
						setNowCon(nowCon);
					});
				}

			} else if (prevY > nowY && !isscrolling) {
				if (nowCon > 0) {
					nowCon--;
					startScroll(nowCon);
					scrollToAnimate(conY[nowCon], function() {
						setNowCon(nowCon);
					});
				}
			}
			prevY = nowY;
		}
	} else {

		navul.onclick = function(e) {
			nowCon = Number(e.target.id.substring(3));
			var toY = conY[nowCon];
			scrollToAnimate(toY, function() {
				setNowCon(nowCon);
			});
		}
	}


	// window.onresize=function(){
	// 	setHomeWH();
	// }
}

var isInitSkillTree = false; //skill tree status lock
function startScroll(nowCon) {
	//skill tree return
	if (isInitSkillTree && nowCon !== 1) {
		skillTreeReturn(window['skilltreectcanvas'], window['groupnode'], window['groupnode2'], window['groupline'], window['groupline2']);
	}
	//skill tree boom
	if (isInitSkillTree && nowCon === 1) {
		skillTreeBoom(window['skilltreectcanvas'], window['skillhead']);
	}
	//init skill tree
	if (nowCon === 1 && !isInitSkillTree) {
		var skillcircle = document.getElementById('skillcircle');
		var skillcircleanimate = setInterval(function() {
			if (skillcircle.style.opacity < 1) {
				skillcircle.style.opacity = Number(skillcircle.style.opacity) + 0.1;
			} else {
				clearInterval(skillcircleanimate);
			}
		}, 100);
		window['skilltreectcanvas'] = skilltree();
	}
	//timeline init
	if (nowCon === 2 && !window['timelinectcanvas']) {
		window['timelinectcanvas'] = timelineInit();
	}
	//timeline return
	if (nowCon !== 2 && window['timelinectcanvas']) {
		timelineReturn(window['timelinectcanvas']);
	}

}

var isscrolling = false; //scolling lock
function scrollToAnimate(y, callback) {
	if (!isscrolling) {
		isscrolling = true;
		var nowY = document.documentElement.scrollTop + document.body.scrollTop;
		var step = (y - nowY) / 30;
		nowY += step * 5;
		window.scrollTo(0, nowY);
		var count = 25;

		function animateloop() {
			nowY += step;
			count--;
			window.scrollTo(0, nowY);
			if (count > 0) {
				setTimeout(animateloop, 20);
			} else {
				setTimeout(function() {
					if (callback) {
						callback();
					}
					isscrolling = false;
				}, 30)
			}
		}
		animateloop();

	}

}

function setNowCon(nowCon) {
	document.getElementById('nav0').className = '';
	document.getElementById('nav1').className = '';
	document.getElementById('nav2').className = '';
	document.getElementById('nav3').className = '';
	var nav = document.getElementById('nav' + nowCon).className = 'navNow';
}

//=================skill tree================

function showSkillTree() {
	var ctcanvas = new ctCanvas('skilltree');
	ctcanvas.addTrigger('click');
	var core = new ctFillCircle('#333', 300, 300, 75, 0.1);
	var core1 = new ctFillCircle('#444', 300, 300, 160, 0.1);
	var core2 = new ctFillCircle('#444', 300, 300, 250, 0.1);
	var arcA = new skillArc('#f0db4f', -55, 35, 75);
	var arcB = new skillArc('#d94c28', 35, 45, 75);
	var arcC = new skillArc('#ffb415', 45, 75, 75);
	var arcD = new skillArc('#574498', 75, 195, 75);
	var arcE = new skillArc('#2e2a69', 195, 225, 75);
	var arcF = new skillArc('#046aae', 225, 255, 75);
	var arcG = new skillArc('#3ad591', 255, 305, 75);
	var skillhead;
	var skillheadimg = new Image();
	skillheadimg.src = 'res/img/skillhead.png';
	skillheadimg.onload = function() {
		skillhead = new ctDrawImg(skillheadimg, 225, 225);
		ctcanvas.addObj(skillhead);
		window['skillhead'] = skillhead;
		var skillOgroup = [core, core1, core2, arcA, arcB, arcC, arcD, arcE, arcF, arcG, skillhead];
		ctcanvas.addObjs(skillOgroup);
		window['skillhead'].on('click', function() {
			var headimg = new Image();
			headimg.src = 'res/img/skillhead.png';
			headimg.onload = function() {
				window['skillhead'].img = headimg;
				ctcanvas.drawCanvas();
			};
		});
	};


	var nodeJS = new skillNode('JS', '#f0db4f', 395, 248, 1);
	var nodeHTML = new skillNode('HTML', '#d94c28', 428, 404, 1);
	var nodeCSS = new skillNode('CSS', '#ffb415', 325, 370, 1);
	var nodeJava = new skillNode('Java', '#574498', 110, 270, 1);
	var nodepython = new skillNode('python', '#574498', 158, 380, 1);
	var nodenodejs = new skillNode('nodejs', '#574498', 270, 430, 1);
	var nodeSQL = new skillNode('SQL', '#2e2a69', 96, 170, 1);
	var nodegit = new skillNode('git', '#046aae', 208, 162, 1);
	var nodePS = new skillNode('PS', '#3ad591', 310, 72, 1);
	var groupnode = [nodeJS, nodeHTML, nodeCSS, nodeJava, nodepython, nodenodejs, nodeSQL, nodegit, nodePS];
	var groupline = [];

	lineNode(nodeJS);
	lineNode(nodePS);
	lineNode(nodegit);
	lineNode(nodeCSS);
	lineNode(nodeHTML);
	lineNode(nodepython);
	lineNode(nodeJava, 195, 300);
	lineNode(nodeSQL);
	lineNode(nodenodejs, 300, 405);

	var linearc = new ctStrokeArc('#574498', 2, 300, 300, 105, 90, 180, 1);
	groupline.push(linearc);
	ctcanvas.addObjs(groupline);
	ctcanvas.addObjs(groupnode);


	var nodeThreejs = new skillNode('Threejs', '#f0db4f', 440, 140, 1);
	var nodetypescript = new skillNode('TypeScript', '#f0db4f', 484, 232, 1);
	var nodeegret = new skillNode('egret', '#f0db4f', 580, 215, 1);
	var nodejQuery = new skillNode('jQuery', '#f0db4f', 477, 331, 1);
	var nodeLESS = new skillNode('LESS', '#ffb415', 360, 468, 1);
	var nodedjango = new skillNode('django', '#574498', 91, 450, 1);
	var nodeservlet = new skillNode('Servlet', '#574498', 39, 270, 1);
	var nodeMySQL = new skillNode('MySQL', '#2e2a69', 96, 74, 1);
	var groupnode2 = [nodeThreejs, nodetypescript, nodeegret, nodejQuery, nodeLESS, nodedjango, nodeservlet, nodeMySQL];
	var groupline2 = [];

	lineNode2(nodeMySQL, nodeSQL.x + 30, nodeSQL.y + 30);
	lineNode2(nodeservlet, nodeJava.x + 30, nodeJava.y + 30);
	lineNode2(nodedjango, nodepython.x + 30, nodepython.y + 30);
	lineNode2(nodeLESS, nodeCSS.x + 30, nodeCSS.y + 30);
	lineNode2(nodetypescript, nodeJS.x + 30, nodeJS.y + 30);
	lineNode2(nodeegret, nodetypescript.x + 30, nodetypescript.y + 30);
	lineNode2(nodeThreejs, nodeJS.x + 30, nodeJS.y + 30);
	lineNode2(nodejQuery, nodeJS.x + 30, nodeJS.y + 30);



	function lineNode(skillnode, x, y) {
		var line = new ctLine(skillnode.fillStyle, x || 300, y || 300, skillnode.x + 30, skillnode.y + 30, 2, 1);
		groupline.push(line);
	}

	function lineNode2(skillnode, x, y) {
		var line = new ctLine(skillnode.fillStyle, x || 300, y || 300, skillnode.x + 30, skillnode.y + 30, 2, 1);
		groupline2.push(line);
	}
	ctcanvas.addObjs(groupline2);
	ctcanvas.addObjs(groupnode2);
	ctcanvas.drawCanvas();
	bind();

	function bind() {
		window['groupnode'] = groupnode;
		window['groupnode2'] = groupnode2;
		window['groupline'] = groupline;
		window['groupline2'] = groupline2;
		for (var i = 0; i < groupnode.length; i++) {
			bindNode(groupnode[i]);
		}
		for (var j = 0; j < groupnode2.length; j++) {
			bindNode(groupnode2[j]);
		}
		isInitSkillTree = true;


	}

	function bindNode(node) {
		node.on('click', function() {
			var headimg = new Image();
			headimg.src = 'res/img/' + node.nodetext.toLowerCase() + '.png';
			headimg.onload = function() {
				window['skillhead'].img = headimg;
				ctcanvas.drawCanvas();
			};
		});
	}
}

function skillO(ctcanvas) {
	var core = new ctFillCircle('#333', 300, 300, 75, 0.1);
	var core1 = new ctFillCircle('#444', 300, 300, 160, 0.1);
	var core2 = new ctFillCircle('#444', 300, 300, 250, 0.1);
	var arcA = new skillArc('#f0db4f', -55, 35, 75);
	var arcB = new skillArc('#d94c28', 35, 45, 75);
	var arcC = new skillArc('#ffb415', 45, 75, 75);
	var arcD = new skillArc('#574498', 75, 195, 75);
	var arcE = new skillArc('#2e2a69', 195, 225, 75);
	var arcF = new skillArc('#046aae', 225, 255, 75);
	var arcG = new skillArc('#3ad591', 255, 305, 75);
	// arcA.sangle=-54*Math.PI/180;
	// arcA.eangle=34*Math.PI/180;
	// arcB.sangle=36*Math.PI/180;
	// arcB.eangle=44*Math.PI/180;
	// arcC.sangle=46*Math.PI/180;
	// arcC.eangle=74*Math.PI/180;
	// arcD.sangle=76*Math.PI/180;
	// arcD.eangle=194*Math.PI/180;
	// arcE.sangle=196*Math.PI/180;
	// arcE.eangle=224*Math.PI/180;
	// arcF.sangle=226*Math.PI/180;
	// arcF.eangle=254*Math.PI/180;
	// arcG.sangle=256*Math.PI/180;
	// arcG.eangle=304*Math.PI/180;

	var skillhead = window['skillhead'];
	var skillOgroup = [core, core1, core2, arcA, arcB, arcC, arcD, arcE, arcF, arcG, skillhead];
	ctcanvas.reset();
	ctcanvas.addTrigger('click');
	ctcanvas.addTrigger('mousemove');
	ctcanvas.addObjs(skillOgroup);
	ctcanvas.drawCanvas();
}

function skilltree() {
	var ctcanvas = new ctCanvas('skilltree');
	ctcanvas.addTrigger('click');
	ctcanvas.addTrigger('mousemove');
	var core = new ctFillCircle('#333', 300, 300, 5, 0.3);
	var core1 = new ctFillCircle('#444', 300, 300, 5, 0.1);
	var core2 = new ctFillCircle('#444', 300, 300, 5, 0.1);
	var groupCore = [core2, core1, core];
	ctcanvas.addObjs(groupCore);
	var coreAnimate = animation(function() {
		if (core.r < 75) {
			core.r += 5;
			core.x -= 5;
			core.y -= 5;
		}
		if (core1.r < 160) {
			core1.r += 5;
			core1.x -= 5;
			core1.y -= 5;
		}
		if (core2.r < 250) {
			core2.r += 5;
			core2.x -= 5;
			core2.y -= 5;
		} else {
			clearInterval(coreAnimate);
			skillArcAnimate();
		}
	}, ctcanvas);
	var arcA = new skillArc('#f0db4f', -55, 35, 75);
	var arcB = new skillArc('#d94c28', 35, 45, 85);
	var arcC = new skillArc('#ffb415', 45, 75, 75);
	var arcD = new skillArc('#574498', 75, 195, 70);
	var arcE = new skillArc('#2e2a69', 195, 225, 75);
	var arcF = new skillArc('#046aae', 225, 255, 80);
	var arcG = new skillArc('#3ad591', 255, 305, 70);
	var groupArc = [arcA, arcB, arcC, arcD, arcE, arcF, arcG];

	function skillArcAnimate() {


		arcAnimate(arcG, function() {
			arcAnimate(arcA, function() {
				arcAnimate(arcB, function() {
					arcAnimate(arcC, function() {
						arcToCircle();
					});
				});
			});
		});
		arcAnimate(arcD, function() {
			arcAnimate(arcE, function() {
				arcAnimate(arcF);
			});
		});
	}

	function arcAnimate(arc, callback) {
		var sangle = arc.sangle;
		var eangle = arc.eangle;
		arc.eangle = sangle + 5 * Math.PI / 180;
		ctcanvas.addObj(arc);
		var arcanimate = animation(function() {
			if (arc.eangle < eangle) {
				arc.eangle += 5 * Math.PI / 180;
			} else {
				clearInterval(arcanimate);
				if (callback) {
					callback();
				}

			}

		}, ctcanvas);
	}

	function arcToCircle() {
		arcD.r -= 5;
		arcB.r += 10;
		arcF.r += 5;
		arcG.r -= 10;
		var arctocircleanimate = animation(function() {
			if (arcD.r < 75) {
				arcD.r++;
			}
			if (arcF.r > 75) {
				arcF.r--;
			}
			if (arcG.r < 75) {
				arcG.r++;
			}
			if (arcB.r > 75) {
				arcB.r--;
			} else {
				clearInterval(arctocircleanimate);
				circleToO();
			}

		}, ctcanvas);
	}
	var skillhead;

	function circleToO() {

		// arcA.sangle=-54*Math.PI/180;
		// arcA.eangle=34*Math.PI/180;
		// arcB.sangle=36*Math.PI/180;
		// arcB.eangle=44*Math.PI/180;
		// arcC.sangle=46*Math.PI/180;
		// arcC.eangle=74*Math.PI/180;
		// arcD.sangle=76*Math.PI/180;
		// arcD.eangle=194*Math.PI/180;
		// arcE.sangle=196*Math.PI/180;
		// arcE.eangle=224*Math.PI/180;
		// arcF.sangle=226*Math.PI/180;
		// arcF.eangle=254*Math.PI/180;
		// arcG.sangle=256*Math.PI/180;
		// arcG.eangle=304*Math.PI/180;

		// ctcanvas.drawCanvas();

		var skillheadimg = new Image();
		skillheadimg.src = 'res/img/skillhead.png';
		skillheadimg.onload = function() {
			skillhead = new ctDrawImg(skillheadimg, 225, 225);
			ctcanvas.addObj(skillhead);
			window['skillhead'] = skillhead;
			skillTreeBoom(ctcanvas, skillhead);
		};
	}
	return ctcanvas;
}
var isBoomed = false; //skill tree state lock
function skillTreeBoom(ctcanvas, skillhead) {
	if (!isBoomed) {
		isBoomed = true;

		skillO(ctcanvas);

		var nodeJS = new skillNode('JS', '#f0db4f', 395, 248, 0.01);
		var nodeHTML = new skillNode('HTML', '#d94c28', 428, 404, 0.01);
		var nodeCSS = new skillNode('CSS', '#ffb415', 325, 370, 0.01);
		var nodeJava = new skillNode('Java', '#574498', 110, 270, 0.01);
		var nodepython = new skillNode('python', '#574498', 158, 380, 0.01);
		var nodenodejs = new skillNode('nodejs', '#574498', 270, 430, 0.01);
		var nodeSQL = new skillNode('SQL', '#2e2a69', 96, 170, 0.01);
		var nodegit = new skillNode('git', '#046aae', 208, 162, 0.01);
		var nodePS = new skillNode('PS', '#3ad591', 310, 72, 0.01);
		var groupnode = [nodeJS, nodeHTML, nodeCSS, nodeJava, nodepython, nodenodejs, nodeSQL, nodegit, nodePS];
		var groupline = [];
		boom1();

		function boom1() {
			lineNode(nodeJS);
			lineNode(nodePS);
			lineNode(nodegit);
			lineNode(nodeCSS);
			lineNode(nodeHTML);
			lineNode(nodepython);
			lineNode(nodeJava, 195, 300);
			lineNode(nodeSQL);
			lineNode(nodenodejs, 300, 405);

			var linearc = new ctStrokeArc('#574498', 2, 300, 300, 105, 90, 180, 0.01);
			groupline.push(linearc);

			ctcanvas.addObjs(groupline);
			ctcanvas.addObjs(groupnode);

			ctcanvas.removeObj(skillhead);
			ctcanvas.addObj(skillhead);

			for (var i = 0; i < groupnode.length; i++) {
				boomNode(groupnode[i]);
			}
			setTimeout(function() {
				for (var j = 0; j < groupline.length; j++) {
					groupline[j].to({
						alpha: 1
					}, 300);
				}
				setTimeout(boom2(), 500);
			}, 600);

		}

		function boomNode(skillnode, sx, sy) {
			var ex = skillnode.x;
			var ey = skillnode.y;
			skillnode.x = sx || 270;
			skillnode.y = sy || 270;
			skillnode.alpha = 1;
			skillnode.to({
				x: ex,
				y: ey
			}, 500);
		}

		var nodeThreejs = new skillNode('Threejs', '#f0db4f', 440, 140, 0.01);
		var nodetypescript = new skillNode('TypeScript', '#f0db4f', 484, 232, 0.01);
		var nodeegret = new skillNode('egret', '#f0db4f', 580, 215, 0.01);
		var nodejQuery = new skillNode('jQuery', '#f0db4f', 477, 331, 0.01);
		var nodeLESS = new skillNode('LESS', '#ffb415', 360, 468, 0.01);
		var nodedjango = new skillNode('django', '#574498', 91, 450, 0.01);
		var nodeservlet = new skillNode('Servlet', '#574498', 39, 270, 0.01);
		var nodeMySQL = new skillNode('MySQL', '#2e2a69', 96, 74, 0.01);
		var groupnode2 = [nodeThreejs, nodetypescript, nodeegret, nodejQuery, nodeLESS, nodedjango, nodeservlet, nodeMySQL];
		var groupline2 = [];

		function boom2() {

			lineNode2(nodeMySQL, nodeSQL.x + 30, nodeSQL.y + 30);
			lineNode2(nodeservlet, nodeJava.x + 30, nodeJava.y + 30);
			lineNode2(nodedjango, nodepython.x + 30, nodepython.y + 30);
			lineNode2(nodeLESS, nodeCSS.x + 30, nodeCSS.y + 30);
			lineNode2(nodetypescript, nodeJS.x + 30, nodeJS.y + 30);
			lineNode2(nodeegret, nodetypescript.x + 30, nodetypescript.y + 30);
			lineNode2(nodeThreejs, nodeJS.x + 30, nodeJS.y + 30);
			lineNode2(nodejQuery, nodeJS.x + 30, nodeJS.y + 30);

			ctcanvas.addObjs(groupline2);
			ctcanvas.removeObjs(groupnode);
			ctcanvas.addObjs(groupnode);
			ctcanvas.addObjs(groupnode2);

			boomNode(nodeMySQL, nodeSQL.x, nodeSQL.y);
			boomNode(nodeservlet, nodeJava.x, nodeJava.y);
			boomNode(nodedjango, nodepython.x, nodepython.y);
			boomNode(nodeLESS, nodeCSS.x, nodeCSS.y);
			boomNode(nodeThreejs, nodeJS.x, nodeJS.y);
			boomNode(nodetypescript, nodeJS.x, nodeJS.y);
			boomNode(nodejQuery, nodeJS.x, nodeJS.y);
			boomNode(nodeegret, nodeJS.x, nodeJS.y);

			setTimeout(function() {
				for (var j = 0; j < groupline2.length; j++) {
					groupline2[j].to({
						alpha: 1
					}, 300);
				}
				setTimeout(bind(), 500);
			}, 600);

		}

		function lineNode(skillnode, x, y) {
			var line = new ctLine(skillnode.fillStyle, x || 300, y || 300, skillnode.x + 30, skillnode.y + 30, 2, 0.01);
			groupline.push(line);
		}

		function lineNode2(skillnode, x, y) {
			var line = new ctLine(skillnode.fillStyle, x || 300, y || 300, skillnode.x + 30, skillnode.y + 30, 2, 0.01);
			groupline2.push(line);
		}

		function bind() {
			window['groupnode'] = groupnode;
			window['groupnode2'] = groupnode2;
			window['groupline'] = groupline;
			window['groupline2'] = groupline2;
			for (var i = 0; i < groupnode.length; i++) {
				bindNode(groupnode[i]);
			}
			for (var j = 0; j < groupnode2.length; j++) {
				bindNode(groupnode2[j]);
			}
			isInitSkillTree = true;
			window['skillhead'].on('click', function() {
				if (isBoomed) {
					skillTreeReturn(window['skilltreectcanvas'], window['groupnode'], window['groupnode2'], window['groupline'], window['groupline2']);
				} else {
					skillTreeBoom(window['skilltreectcanvas'], window['skillhead']);
				}
			});

		}

		function bindNode(node) {
			node.on('click', function() {
				node.r = 30;
				var headimg = new Image();
				headimg.src = 'res/img/' + node.nodetext.toLowerCase() + '.png';
				headimg.onload = function() {
					window['skillhead'].img = headimg;
					ctcanvas.drawCanvas();
				};
				setTimeout(function() {
					node.r = 25;
					ctcanvas.drawCanvas();
				}, 200);
			});
			node.on('mousemove', function() {
				if (node.r === 25) {
					node.r = 30;
					ctcanvas.drawCanvas();
					setTimeout(function() {
						node.r = 25;
						ctcanvas.drawCanvas();
					}, 500);
				}
			});

		}

	}

}

function skillTreeReturn(ctcanvas, groupnode, groupnode2, groupline, groupline2) {
	if (isBoomed) {
		var headimg = new Image();
		headimg.src = 'res/img/skillhead.png';
		headimg.onload = function() {
			window['skillhead'].img = headimg;
			ctcanvas.removeObj(window['skillhead']);
			ctcanvas.addObj(window['skillhead']);
			ctcanvas.drawCanvas();
		};
		ctcanvas.removeObjs(groupline);
		ctcanvas.removeObjs(groupline2);
		for (var i = 0; i < groupnode.length; i++) {
			groupnode[i].to({
				x: 270,
				y: 270
			}, 500);
		}
		for (var j = 0; j < groupnode2.length; j++) {
			groupnode2[j].to({
				x: 270,
				y: 270
			}, 500);
		}

		setTimeout(function() {
			ctcanvas.removeObjs(groupnode);
			ctcanvas.removeObjs(groupnode2);
			isBoomed = false;
			window['skillhead'].on('click', function() {
				if (isBoomed) {
					skillTreeReturn(window['skilltreectcanvas'], window['groupnode'], window['groupnode2'], window['groupline'], window['groupline2']);
				} else {
					skillTreeBoom(window['skilltreectcanvas'], window['skillhead']);
				}
			});
		}, 600);
	}

}

//skillTreeReturn(window['skilltreectcanvas'],window['groupnode'],window['groupnode2'],window['groupline'],window['groupline2']);
//skillTreeBoom(window['skilltreectcanvas'],window['skillhead']);


//================time line=======================
function timelineInit() {
	var timelinecanvas = document.getElementById('timeline');
	var islandscape = false;
	if (window.innerWidth >= 850) {
		timelinecanvas.width = 800;
		timelinecanvas.height = 100;
		islandscape = true;
	}
	var timelinectcanvas = new ctCanvas('timeline');
	timelinectcanvas.addTrigger('click');
	timelinectcanvas.addTrigger('mousedown');
	timelinectcanvas.addTrigger('mouseup');
	timelinectcanvas.addTrigger('mousemove');
	var scut = new timeNode(islandscape, 'SCUT', "#f2a152", 30, 30, 16);
	var bbt = new timeNode(islandscape, 'BBT', "#36ac4b", 30, 72, 13);
	var graduate = new timeNode(islandscape, 'graduate', "#35ad98", 30, 196, 7);
	var dialogue = new timeNode(islandscape, '对白', "#fff", 30, 249, 9);
	var dkzhome = new timeNode(islandscape, 'DKZ HOME', "#222", 30, 371, 10);
	var artistZengxin = new timeNode(islandscape, 'artist ZengXin', "#b28850", 30, 405, 5);
	var cubex3 = new timeNode(islandscape, 'CUBEx3', "#48afd8", 30, 472, 14);
	var paypal = new timeNode(islandscape, 'Paypal payment', "#042e78", 30, 513, 11);
	var meiriq = new timeNode(islandscape, 'meiriq Game', "#fc631c", 30, 581, 12);
	var egretInit = new timeNode(islandscape, 'egretInit', "#0f0", 30, 611, 6);
	var canvastrigger = new timeNode(islandscape, 'canvasTrigger', "#f00", 30, 641, 8);
	var timeline = new ctLine('#000', 30, 30, 30, 30, 4);
	timelinectcanvas.addObj(timeline);
	var timenodegroup = [scut, bbt, graduate, dialogue, dkzhome, artistZengxin, cubex3, paypal, meiriq, egretInit, canvastrigger];
	timelinectcanvas.addObjs(timenodegroup);
	var timelineanimate = animation(function() {
		if (timeline.ey < 641 && window.innerWidth < 850) {
			timeline.ey += 10;
		} else if (timeline.ex < 641 && window.innerWidth >= 850) {
			timeline.ex += 10;
		} else {
			clearInterval(timelineanimate);
		}
	}, timelinectcanvas);
	for (var i = 0; i < timenodegroup.length; i++) {
		boomTime(timenodegroup[i]);
		bindTimeNode(timenodegroup[i]);
	}

	function bindTimeNode(timenode) {
		// timenode.on('mousemove',function(){
		// 	timenode.textalpha=1;
		// 	var textalphaanimate=animation(function(){
		// 		if(timenode.textalpha>0.05){
		// 			timenode.textalpha-=0.01;
		// 		}else{
		// 			clearInterval(textalphaanimate);
		// 		}
		// 	},timelinectcanvas);
		// });
		timenode.on('mousedown', function() {
			timenode.textalpha = 1;
			if (timenode.r >= 3) {
				timenode.r -= 3;
			}
			timelinectcanvas.drawCanvas();
		});
		timenode.on('mouseup', function() {
			timenode.textalpha = 0.1;
			if (timenode.r < 16) {
				timenode.r += 3;
			}
			timelinectcanvas.drawCanvas();
		});
		timenode.on('click', function() {
			clickTimeNode(timenode.timetitle);
		});
	}

	function boomTime(timenode) {
		if (window.innerWidth > 850) {
			var ex = timenode.y;
			var ey = timenode.x;
		} else {
			var ex = timenode.x;
			var ey = timenode.y;
		}

		timenode.x = 10;
		timenode.y = 10;
		timenode.alpha = 1;
		timenode.to({
			x: ex,
			y: ey
		}, 1000);
	}
	return timelinectcanvas;
}

function timelineReturn(timelinectcanvas) {
	timelinectcanvas.reset();
	window['timelinectcanvas'] = null;
}
var timedata = [{
	"id": "SCUT",
	"data": {
		"title": "华南理工大学",
		"info": "经济与贸易学院 电子商务 管理学学士",
		"date": "2011.9-2015.7",
		"list": ["2013年华南理工大学经济与贸易学院优秀共青团干部", "2014年华南理工大学优秀学生干部"]
	}
}, {
	"id": "BBT",
	"data": {
		"title": "百步梯",
		"info": "百步梯学生创新中心 美工部 部长",
		"date": "2011.9-2014.4",
		"list": ["百步梯组织形象 VI设计 海报设计", "第八届雕刻时光电影节光迹涂鸦活动海报", "2013年爱上女主播播音主持大赛舞台布置"]
	}
}, {
	"id": "graduate",
	"data": {
		"title": "毕业季",
		"info": "百步梯毕业季活动官方网站设计",
		"date": "2013.4",
		"list": ["http://bbtgraduate.sinaapp.com", "整页滚动网站 开始接触前端", "jQuery html css"]
	}
}, {
	"id": "_E5_AF_B9_E7_99_BD",
	"data": {
		"title": "对白",
		"info": "台词查询网站",
		"date": "2012.6-2014.2",
		"list": ["http://dialogue.sinaapp.com", "台词分享查询网站 使用爬虫收集字幕文件并解析添加到数据库","2016/1增加微信接口可在公众号 造物 中使用", "python django flask mysql sae sqlite"]
	}
}, {
	"id": "DKZ_20HOME",
	"data": {
		"title": "DKZ's HOME",
		"info": "我的个人主页",
		"date": "2014.6-2014.7 update 2015.8-",
		"list": ["http://davidkingzyb.github.io", "我的个人主页 了解我更多 Hello World!", "DKZ's BLOG 分享技术 基于markdown实现", "python JavaSctipt TypeScript canvas markdown"]
	}
}, {
	"id": "artist_20ZengXin",
	"data": {
		"title": "油画家曾新",
		"info": "父亲的油画展示页面",
		"date": "2014.7-2014.8",
		"list": ["http://zengxin.sinaapp.com", "给爸爸做的首页 展示爸爸的作品", "个性化定制可复用的UI组件", "django jquery svg sae"]
	}
}, {
	"id": "CUBEx3",
	"data": {
		"title": "CUBEx3",
		"info": "独立游戏",
		"date": "2014.11-",
		"list": ["http://cubex3.sinaapp.com", "独立完成游戏的构思 角色设计", "功能设计 交互设计 UI及美工制作", "前端及后台的代码实现","2015白鹭杯HTML5游戏开发者大赛最佳创意奖提名和最具潜力奖", "python django MySQL jquery CSS-transform"]
	}
}, {
	"id": "Paypal_20payment",
	"data": {
		"title": "PayPal Pay",
		"info": "基于PayPal实现的支付系统",
		"date": "2014.12-2015.5",
		"list": ["http://cubex3.sinaapp.com/paypal", "支付流程设计 制定解决方案 代码实现", "将其应用于游戏CubeX3的虚拟道具支付功能", "python paypal-python-SDK"]
	}
}, {
	"id": "meiriq_20Game",
	"data": {
		"title": "meiriq Game",
		"info": "每日Q游戏 前端开发工程师",
		"date": "2015.4-12",
		"list": ["http://davidkingzyb.github.io/blogmd/10.html","使用egret引擎开发HTML5小游戏", "艾斯特的记忆 魔法师学徒 找出卧底", "双色消除物语 等多款游戏主程"]
	}
}, {
	"id": "egretInit",
	"data": {
		"title": "egretInit",
		"info": "快速构建egret项目",
		"date": "2015.6-11",
		"list": ["https://github.com/davidkingzyb/egretInit", "封装常用的egret方法与类", "优化工作流 快速定义资源", "基于时间使用observe模式的帧动画管理类","常用的可复用组件", "debug工具 实现可视化编辑"]
	}
}, {
	"id": "canvasTrigger",
	"data": {
		"title": "canvasTrigger",
		"info": "canvas工具库",
		"date": "2015.8-10",
		"list": ["https://github.com/davidkingzyb/canvasTrigger", "用于构建canvas图表与组件", "在canvas中定义对象", "向这些对象派发浏览器事件", "实现基于时间的帧动画和缓动动画"]
	}
}];

function clickTimeNode(timenodetitle) {
	var data;
	for (var i = 0; i < timedata.length; i++) {
		if (timedata[i].id === encodeURI(timenodetitle).replace(/%/g, '_')) {
			data = timedata[i].data;
		}
	}
	renderExpCon(data, encodeURI(timenodetitle).replace(/%/g, '_'));
}

function renderExpCon(data, id) {
	var exptext = document.getElementById('exptext');
	var opacityNum = 1;
	var isopacity = false;
	var opacityanimate = setInterval(function() {
		if (opacityNum > 0.1 && !isopacity) {
			opacityNum -= 0.05;
			expcon.style.opacity = opacityNum;
		} else {
			isopacity = true;
			expcon.style.backgroundImage = 'none';
			expcon.style.backgroundImage = 'url(res/img/' + id + '.jpg)';
			var htmlstr = '<ul>';
			for (var i = 0; i < data.list.length; i++) {
				if (data.list[i].substring(0, 4) === 'http') {
					htmlstr = htmlstr + '<li><a href="' + data.list[i] + '">' + data.list[i] + '</a></li>';
				} else {
					htmlstr = htmlstr + '<li>' + data.list[i] + '</li>';
				}
			}
			var htmlstr = htmlstr + '</ul><h2>' + data.title + '</h2><p>' + data.date + '</p><h3>' + data.info + '</h3>';
			exptext.innerHTML = htmlstr;
			if (isopacity && opacityNum < 1) {
				opacityNum += 0.05;
				expcon.style.opacity = opacityNum;
			} else {
				isopacity = false;
				opacityNum = 1;
				clearInterval(opacityanimate);
			}
		}

	}, 30);

}

function rotateCube() {
	var contactcon = document.getElementById('contactcon');
	var cube = document.getElementById('cube');
	contactcon.onmousemove = function(e) {
		var a = Math.atan((e.clientY - window.innerHeight / 2) / (e.clientX - window.innerWidth / 2)) * 180 / Math.PI;
		if (e.clientY - window.innerHeight / 2 > 0 && e.clientX - window.innerWidth / 2 < 0) {
			cube.style.transform = 'rotateZ(' + a / 2 + 'deg)';
			cube.style.webkitTransform = 'rotateZ(' + a / 2 + 'deg)';
		} else if (e.clientY - window.innerHeight / 2 > 0 && e.clientX - window.innerWidth / 2 > 0) {
			cube.style.transform = 'rotateZ(' + (a / 2 - 90) + 'deg)';
			cube.style.webkitTransform = 'rotateZ(' + (a / 2 - 90) + 'deg)';
		} else if (e.clientY - window.innerHeight / 2 < 0 && e.clientX - window.innerWidth / 2 > 0) {
			cube.style.transform = 'rotateZ(' + (a / 2 - 180) + 'deg)';
			cube.style.webkitTransform = 'rotateZ(' + (a / 2 - 180) + 'deg)';
		} else if (e.clientY - window.innerHeight / 2 < 0 && e.clientX - window.innerWidth / 2 < 0) {
			cube.style.transform = 'rotateZ(' + (a / 2 + 90) + 'deg)';
			cube.style.webkitTransform = 'rotateZ(' + (a / 2 + 90) + 'deg)';
		}

	};
}

function showTimeLine() {
	var timelinecanvas = document.getElementById('timeline');
	var islandscape = false;
	if (window.innerWidth >= 850) {
		timelinecanvas.width = 800;
		timelinecanvas.height = 100;
		islandscape = true;
	}
	var timelinectcanvas = new ctCanvas('timeline');
	timelinectcanvas.addTrigger('click');
	var scut = new timeNode(islandscape, 'SCUT', "#f2a152", 30, 30, 16);
	var bbt = new timeNode(islandscape, 'BBT', "#36ac4b", 30, 72, 13);
	var graduate = new timeNode(islandscape, 'graduate', "#35ad98", 30, 196, 7);
	var dialogue = new timeNode(islandscape, '对白', "#fff", 30, 249, 9);
	var dkzhome = new timeNode(islandscape, 'DKZ HOME', "#222", 30, 371, 10);
	var artistZengxin = new timeNode(islandscape, 'artist ZengXin', "#b28850", 30, 405, 5);
	var cubex3 = new timeNode(islandscape, 'CUBEx3', "#48afd8", 30, 472, 14);
	var paypal = new timeNode(islandscape, 'Paypal payment', "#042e78", 30, 513, 11);
	var meiriq = new timeNode(islandscape, 'meiriq Game', "#fc631c", 30, 581, 12);
	var egretInit = new timeNode(islandscape, 'egretInit', "#0f0", 30, 611, 6);
	var canvastrigger = new timeNode(islandscape, 'canvasTrigger', "#f00", 30, 641, 8);
	var timeline = new ctLine('#000', 30, 30, 30, 30, 4);
	timelinectcanvas.addObj(timeline);
	var timenodegroup = [scut, bbt, graduate, dialogue, dkzhome, artistZengxin, cubex3, paypal, meiriq, egretInit, canvastrigger];
	timelinectcanvas.addObjs(timenodegroup);

	if (window.innerWidth < 850) {
		timeline.ey = 641;
	} else if (window.innerWidth >= 850) {
		timeline.ex = 641;
	}
	for (var i = 0; i < timenodegroup.length; i++) {
		boomTime(timenodegroup[i]);
		bindTimeNode(timenodegroup[i]);
	}

	function bindTimeNode(timenode) {

		timenode.textalpha = 0;

		timenode.on('click', function() {
			clickTimeNode(timenode.timetitle);
		});
	}

	function boomTime(timenode) {
		if (window.innerWidth > 850) {
			var ex = timenode.y;
			var ey = timenode.x;
		} else {
			var ex = timenode.x;
			var ey = timenode.y;
		}

		timenode.x = ex;
		timenode.y = ey;
		timenode.alpha = 1;
	}
	timelinectcanvas.drawCanvas();

}