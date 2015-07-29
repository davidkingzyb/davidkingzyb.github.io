import os
import json

files=os.listdir('./blogmd');

def MDtoJson(file):
	index=int(file.split('.')[0])
	with open('./blogmd/'+file,'r', encoding='UTF-8') as f:
		lines=f.readlines()
		title=lines[0][1:-1]
		info=lines[2][2:-3]
		key=lines[4][:-1]
		img=lines[6]
		img=img[img.find('(')+1:-2]
	return {"index":index,"title":title,"info":info,"key":key,"img":img}

def createJson(files):
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

def doBlogs(files):
	for f in files:
		if(f!='blogImg'):
			t=f.split('.')[1]
			if t=='html':
				packHtml(f)

def readHtml(file):
	with open('./blogmd/'+file,'r', encoding='UTF-8') as f:
		html=f.read()
		start=html.find('<article')
		end=html.find('</article>')
		body=html[start:end+10]
		return body

def read(file):
	with open(file,'r', encoding='UTF-8') as f:
		return f.read()

def doImg(body):
	result=''
	start=body.find('///')
	result=body[:start]
	end=body.find('blogImg',start)
	while start!=-1:
		start=body.find('///',end)
		result=result+body[end:start]
		end=body.find('blogImg',start)
	result=result+body[end:]
	return result


head=read('head.html')
foot=read('foot.html')
def packHtml(file):
	body=readHtml(file)
	if body.find('///')!=-1:
		body=doImg(body)
	with open('./blogmd/'+file,'w', encoding='UTF-8') as f:
		f.write(head+body+foot)

createJson(files)
doBlogs(files)
print('ok')


