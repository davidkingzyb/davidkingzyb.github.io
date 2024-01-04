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
var searchJson=[];
var blogobj={};

function getBlogJson() {
    function _getBlogJson(year){
        wtf.get('blog'+year+'.json', function(d) {
            blogobj['blog'+year] = d;
            var y = wtf.urlquery('year');
            if (y == year||year==2024) {
                doYear(year);
            }
        })
    }
    _getBlogJson(2015);
    _getBlogJson(2016);
    _getBlogJson(2017);
    _getBlogJson(2018);
    _getBlogJson(2019);
    _getBlogJson(2020);
    _getBlogJson(2021);
    _getBlogJson(2022);
    _getBlogJson(2023);
    _getBlogJson(2024);
}

function doYear(year) {
    var year = year;
    responseHandle(blogobj['blog' + year]);
}

function responseHandle(blogJson, isError, fromSearch) {
    var respJson = JSON.parse(JSON.stringify(blogJson));
    respJson.blog.sort(function(a, b) {
        return a.index - b.index;
    });
    var innerbodyPane = '<div id="bodyTitle"><h1>DKZ&apos;s blog</h1><hr></div>';
    while (respJson.blog.length !== 0) {
        var article = respJson.blog.pop();
        if (!fromSearch) {
            if (article.index === 0 || article.index === 1) {
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
    if (isError) {
        innerbodyPane = innerbodyPane + '<article class="markdown-body"><h1>Ooops!</h1>';
        innerbodyPane = innerbodyPane + '<p><strong>Can not find. Please change keyword.</strong></p>';
        innerbodyPane = innerbodyPane + '<p>please contact <a href="blogmd/1.html">DKZ</a> to fix it</p>';
        innerbodyPane = innerbodyPane + '</article>';
    }
    innerbodyPane = innerbodyPane 
    + '<div class="markdown-body" id="discusspane">' 
    + '<a href="https://github.com/davidkingzyb/davidkingzyb.github.io/issues/1" class="btn">Discuss</a>' 
    + '<a href="javascript:doYear(2024)" class="btn">2024</a>' 
    + '<a href="javascript:doYear(2023)" class="btn">2023</a>' 
    + '<a href="javascript:doYear(2022)" class="btn">2022</a>' 
    + '<a href="javascript:doYear(2021)" class="btn">2021</a>' 
    + '<a href="javascript:doYear(2020)" class="btn">2020</a>' 
    + '<a href="javascript:doYear(2019)" class="btn">2019</a>' 
    + '<a href="javascript:doYear(2018)" class="btn">2018</a>' 
    + '<a href="javascript:doYear(2017)" class="btn">2017</a>' 
    + '<a href="javascript:doYear(2016)" class="btn">2016</a>' 
    + '<a href="javascript:doYear(2015)" class="btn">2015</a>' 
    + '<div id="copyright">&copy;2015-2024 by DKZ</div></div>';
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

        for(var x in blogobj){
            searchJson=searchJson.concat(blogobj[x].blog)
        }
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
            var isError = false;
            if (req.blog.length === 0) {
                // req.blog.push(searchJson[0]);
                isError = true;
            }
            responseHandle(req, isError, true);
        }

    };

    var footer = document.getElementById('footer');
    if (window.innerWidth >= 750) {
        footer.onmouseover = function() {
            footer.style.height = '100px';
        };
        footer.onmouseout = function() {
            if (isScrollBottom()==false) {
                footer.style.height = '20px';
            }
        };
    }

    function isScrollBottom(){
        return Math.abs(document.body.clientHeight - document.documentElement.clientHeight) <= (document.documentElement.scrollTop || document.body.scrollTop)
    }

    window.onscroll = function() {
        if (isScrollBottom()) {
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
