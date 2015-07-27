import os
import json

files=os.listdir('./blogmd');

def MDtoJson(file):
	index=int(file.split('.')[0])
	with open('./blogmd/'+file,'r') as f:
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
			type=f.split('.')[1]
			index=int(f.split('.')[0])
			if type=='md':
				j=MDtoJson(f)
				blog.append(j)	
	blogJson={"blog":blog}
	with open('blogJson.json','w') as bjf:
		bjf.write(json.dumps(blogJson))

createJson(files)
print('ok')
#print(MDtoJson('0.md'))
