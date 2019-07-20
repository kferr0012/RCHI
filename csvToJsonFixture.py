
import csv
import json as js

print("Input the path to the csv you would like to convert")
csvName = raw_input("Path: ")

out=open(csvName,"rb")
data=csv.reader(out)
data=[row for row in data]
out.close()

print("Input the model name")
modelName = raw_input("Model: ")
json = []

cols = data[0]
data.pop(0)

l = len(cols)

# print >> cols[0], cols[0]


# while cols[0][0] == '\\':
#   print (cols[0])
#   cols[0] = substr(cols,4)

i = 1
for row in data:
  fields = {}
  for j in range(l):
    fields[cols[j]] = row[j] 
  json.append({
    "model" : modelName,
    "pk": i,
    "fields": fields
    })  
  i+=1

print js.dumps(json)

print("Input the new json file name")
modelName = raw_input("Name: ")

out = open(modelName,'w')

out.write (js.dumps(json) )
out.close()

print ("Done")