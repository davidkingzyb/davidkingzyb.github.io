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
var blog2016;
var blog2015;

function getBlogJson() {
    wtf.get('blog2016.json', function(d) {
        blog2016 = JSON.parse(d);
        var year=wtf.getURLQuery('year');
        if(year==null||year=='2016'){
        	doYear(2016);
        }
    });
    wtf.get('blog2015.json', function(d) {
        blog2015 = JSON.parse(d);
        var year=wtf.getURLQuery('year');
        if(year=='2015'){
        	doYear(2015);
        }
    });
}

function doYear(year){
	var year=year;
	responseHandle(window['blog'+year]);
}

function responseHandle(blogJson,isError,fromSearch) {
	var respJson=JSON.parse(JSON.stringify(blogJson));
    respJson.blog.sort(function(a, b) {
        return a.index - b.index;
    });
    var innerbodyPane = '<div id="bodyTitle"><h1>DKZ&apos;s blog</h1><hr></div>';
    while (respJson.blog.length !== 0) {
        var article = respJson.blog.pop();
        if(!fromSearch){
            if(article.index===0||article.index===1){
                continue;
            }
        }
			innerbodyPane = innerbodyPane + '<a href="blogmd/' + article.index + '.html">';
	        innerbodyPane = innerbodyPane + '<article class="markdown-body"><h1>' + article.title + '</h1>';
	        innerbodyPane = innerbodyPane + '<p><strong>' + article.info + '</strong></p>';
	        innerbodyPane = innerbodyPane + '<p>' + article.key + '</p>';
	        if (article.img !== '') {
	            innerbodyPane = innerbodyPane + '<p><img src="blogmd/' + article.img + '" style="max-width:100%;"></p>';
	        }
	        innerbodyPane = innerbodyPane + '</article></a>';
        
    }
    if(isError){
        innerbodyPane = innerbodyPane + '<article class="markdown-body"><h1>Ooops!</h1>';
        innerbodyPane = innerbodyPane + '<p><strong>Can not find. Please change keyword.</strong></p>';
        innerbodyPane = innerbodyPane + '<p>please contact <a href="blogmd/1.html">DKZ</a> to fix it</p>';
        innerbodyPane = innerbodyPane + '</article>';
    }
    innerbodyPane = innerbodyPane + '<div class="markdown-body" id="discusspane">' 
    + '<a href="https://github.com/davidkingzyb/davidkingzyb.github.io/issues/1" class="btn">Discuss</a>' 
    + '<a href="javascript:doYear(2016)" class="btn">2016</a>' 
    + '<a href="javascript:doYear(2015)" class="btn">2015</a>' 
    + '<a href="blogmd/1.html" class="btn">Contact</a>'
    // + '<a href="rss.xml" class="btn" style="color:#ff9632;border:#ff9632 1px solid;">RSS</a>'
    + '<div id="copyright">&copy;2015-2016 by DKZ</div></div>';
    document.getElementById('bodyPane').innerHTML = innerbodyPane;
}

window.onload = function() {

    var canvas = document.getElementById("dkzlogo");
    var context = canvas.getContext('2d');
    var DKZlogo = new DKZLogoClass(context, 15);
    DKZlogo.drawDKZ('stroke');
    setTimeout(DKZlogo.animateDKZ(), 2000);
    canvas.onclick = function() {
        DKZlogo.fillrandomDKZ();
    };


    getBlogJson();


    var searchbtn = document.getElementById("search");

    searchbtn.onclick = function() {

    	searchJson = blog2015.blog.concat(blog2016.blog); 
    	console.log(searchJson)

        
        var key = prompt('Search:');
        if (key) {
        	key.toLowerCase();
            var req = { "blog": [] };
            for (var i = 0; i < searchJson.length; i++) {
                if (searchJson[i].info.toLowerCase().indexOf(key) !== -1 || searchJson[i].title.toLowerCase().indexOf(key) !== -1 || searchJson[i].key.toLowerCase().indexOf(key) !== -1) {
                    req.blog.push(searchJson[i]);
                }
            }
            var isError=false;
            if (req.blog.length === 0) {
                // req.blog.push(searchJson[0]);
                isError=true;
            }
            responseHandle(req,isError,true);
        }

    };

    var footer = document.getElementById('footer');
    if (window.innerWidth >= 750) {
        footer.onmouseover = function() {
            footer.style.height = '100px';
        };
        footer.onmouseout = function() {
            if (document.body.clientHeight - document.body.scrollTop - window.innerHeight > 40) {
                footer.style.height = '20px';
            }
        };
    }

    window.onscroll = function() {
        if (document.body.clientHeight - document.body.scrollTop - window.innerHeight < 40) {
            if (window.innerWidth >= 750) {
                footer.style.height = '100px';
            }
        } else {
            if (window.innerWidth >= 750) {
                footer.style.height = '20px';
            }
        }
    };

};