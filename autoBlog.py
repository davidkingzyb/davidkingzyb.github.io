######################################
##  `_______  `__   __  `_______    ##  
##  |   __  \ |  | /  / |___   /    ##  
##  |  |  \  \|  |/  /     /  /     ##  
##  |  |  |  ||   _  \    /  /      ##  
##  |  |__|  ||  | \  \  /  /____   ##  
##  |________/|__|  \__\/________|  ##  
######################################
#  2016/01/28 by DKZ https://davidkingzyb.github.io

import os
import json
import misaka
import re
import urllib
import blogconfig
import html

files=os.listdir('./blogmd');

def read(file):
    with open(file,'r', encoding='UTF-8') as f:
        return f.read()

def write(file,str):
    with open(file,'w',encoding='UTF-8') as f:
        f.write(str)

def render(o,html):
    for x in o.keys():
        html=html.replace('{{'+x+'}}',o[x])
    return html

head=read('template/head.html')
foot=read('template/foot.html')

def packhtml(htmlbody,id):
    #if id<len(blogconfig.issuearr):
    # o={'discussurl':blogconfig.issueurl+str(id)}#blogconfig.issuearr[id]}
    #else:
    #    o={'discussurl':'http://davidkingzyb.github.io/blogmd/0.html'}
    o={'discussurl':'https://github.com/davidkingzyb/davidkingzyb.github.io/issues/1'};
    html=render(o,head)+'<article class="markdown-body">'+htmlbody+'</article>'+render(o,foot)
    return html


reH=re.compile(r'(<h\d>(.*?)</h\d>)')
reImg=re.compile(r'<img.*?/>')
def addGithubAnchor(htmlstr):
    html=htmlstr
    hdata=re.findall(reH,html)
    for x in hdata:
        pattern=x[0]
        data=x[1]
        hrefstr=' name="'+urllib.parse.quote(data.replace(' ','-').lower())+'"'
        astr=pattern[:4]+'<a class="anchor"'+hrefstr+'><span class="octicon octicon-link"></span></a>'+data+pattern[-5:]
        html=html.replace(pattern,astr)
    return html
    
def MDtoHTML(mdfile):
    print('md to html:'+mdfile)
    md=read('./blogmd/'+mdfile)
    html=misaka.html(md,extensions=['tables','fenced-code'])
    html=addGithubAnchor(html)
    html=packhtml(html,int(mdfile.split('.')[0]))
    write('./blogmd/'+mdfile[:-3]+'.html',html)
    

def doBlogs(files):
    for f in files:
        if(f!='blogImg' and f!='blogImg_src'):
            t=f.split('.')[1]
            if t=='md':
                MDtoHTML(f)

gRSStemplate="""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
    <title>DKZ's Blog</title>
    <link>http://davidkingzyb.github.io/blog.html</link>
    <description>Tech Program Design 造物</description>
    <copyright>(c)2015-2024 by DKZ</copyright>
    <image>
        <url>http://davidkingzyb.github.io/res/img/cubehead.png</url>
        <title>DKZ</title>
        <link>http://davidkingzyb.github.io/blog.html</link>
    </image>
"""
RSStemplate=''

def doRSS(o,lines):
    global RSStemplate
    ll=list(filter(lambda l:l[0:2]!='![',lines))
    article=''.join(ll[8:30])+'...\n\n\nlink: http://davidkingzyb.github.io/blogmd/'+html.escape(str(o['index']))+'.html'
    RSStemplate='<item><title>'+html.escape(o['title'])+'</title><link>http://davidkingzyb.github.io/blogmd/'+html.escape(str(o['index']))+'.html</link><description>'+html.escape(o['info'])+'\n'+html.escape(article)+'</description></item>'

def MDtoJson(file):
    print('md to json:'+file)
    index=int(file.split('.')[0])
    with open('./blogmd/'+file,'r', encoding='UTF-8') as f:
        lines=f.readlines()
        title=lines[0][1:-1]
        info=lines[2][2:-3]
        key=lines[4][:-1]
        img=lines[6]
        img=img[img.find('(')+1:-2]
    result={"index":index,"title":title,"info":info,"key":key,"img":img}
    doRSS(result,lines)
    return result

def createBlogJson(files,jsonfile,bottom,top):
    blog=[]
    for f in files:
        if(f!='blogImg' and f!='blogImg_src'):
            t=f.split('.')[1]
            if t=='md':
                x=int(f.split('.')[0])
                if bottom<=x and x<=top:
                    j=MDtoJson(f)
                    blog.append(j)
    blogJson={"blog":blog}
    with open(jsonfile+'.json','w', encoding='UTF-8') as bjf:
        bjf.write(json.dumps(blogJson))

def createRSSfile(filename):
    global gRSStemplate
    global RSStemplate
    RSStemplate+='</channel></rss>'
    with open(filename+'.xml','w',encoding='UTF-8') as rssf:
        rssf.write(gRSStemplate+RSStemplate)
    print('RSS ok')


doBlogs(files)
createBlogJson(files,'blog2015',0,10)
createBlogJson(files,'blog2016',11,24)
createBlogJson(files,'blog2017',25,27)
createBlogJson(files,'blog2018',28,30)
createBlogJson(files,'blog2019',31,34)
createBlogJson(files,'blog2020',35,36)
createBlogJson(files,'blog2021',37,37)
createBlogJson(files,'blog2022',38,39)
createBlogJson(files,'blog2023',40,43)
createBlogJson(files,'blog2024',44,99)

createRSSfile('rss')


