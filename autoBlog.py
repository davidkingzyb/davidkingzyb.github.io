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
import markdown
import re
import urllib

files=os.listdir('./blogmd');

def read(file):
    with open(file,'r', encoding='UTF-8') as f:
        return f.read()

def write(file,str):
    with open(file,'w',encoding='UTF-8') as f:
        f.write(str)

head=read('head.html')
foot=read('foot.html')

def packhtml(htmlbody):
    html=head+'<article class="markdown-body">'+htmlbody+'</article>'+foot
    return html


reH=re.compile(r'(<h\d>(.*?)</h\d>)')
reImg=re.compile(r'<img.*?/>')
def addGithubAnchor(htmlstr):
    html=htmlstr
    hdata=re.findall(reH,html)
    for x in hdata:
        pattern=x[0]
        data=x[1]
        idstr=' id="user-content-'+data.replace(' ','-').lower()+'"'
        hrefstr=' href="#'+urllib.parse.quote(data.replace(' ','-').lower())+'"'
        astr=pattern[:4]+'<a'+idstr+' class="anchor"'+hrefstr+' aria-hidden="true"><span class="octicon octicon-link"></span></a>'+data+pattern[-5:]
        html=html.replace(pattern,astr)

    # imgdata=re.findall(reImg,html)
    # for y in imgdata:
    #     newstr=y[:-2]+'style="max-width:100%;">'
    #     html=re.sub(y,newstr,html)
    return html
    
def MDtoHTML(mdfile):
    print('md to html:'+mdfile)
    md=read('./blogmd/'+mdfile)
    html=markdown.markdown(md)
    html=addGithubAnchor(html)
    html=packhtml(html)
    write('./blogmd/'+mdfile[:-3]+'.html',html)
    

def doBlogs(files):
    for f in files:
        if(f!='blogImg'):
            t=f.split('.')[1]
            if t=='md':
                MDtoHTML(f)

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
    return {"index":index,"title":title,"info":info,"key":key,"img":img}

def createBlogJson(files):
    blog=[]
    for f in files:
        if(f!='blogImg'):
            t=f.split('.')[1]
            if t=='md':
                j=MDtoJson(f)
                blog.append(j)
    blogJson={"blog":blog}
    with open('blogJson.json','w', encoding='UTF-8') as bjf:
        bjf.write(json.dumps(blogJson))

doBlogs(files)
createBlogJson(files)
