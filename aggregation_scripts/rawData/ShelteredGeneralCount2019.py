import pandas as pd
import numpy as np
import json
import os

#table reference: https://docs.google.com/spreadsheets/d/1z8JvOvScx6HTMiW1q3VeM4kVrg6zA7SLSFm8JYhAl9I/edit#gid=0
# Columns: (index, subpop, 'Unsheltered', 'Sheltered', 'Total Count')

#read excel
raw = pd.read_excel("Final Counts-General.xlsx")
rawTuples = tuple(raw.itertuples())

#needs variables
jsonList = []
pk = 1

#make jsons
for row in rawTuples[0:len(rawTuples)]:
    
    myRow = tuple(row)
    subpopulation = myRow[1]
    shelteredCount = myRow[3]

    flag = True 

    #check for invalids
    if str(subpopulation) == "nan" or str(shelteredCount) == "nan":
        flag = False
    else:
        #print(myRow)

        #make json
        myJson = {}
        myJson["subpopulation"] = subpopulation
        myJson["total"] = shelteredCount
        
        output = {}
        output["pk"] = pk
        output["model"] = "backend.GeneralTableSubpopulationsSheltered2019",
        output['fields'] = myJson

        print(json.dumps(output),end = "")
        print(",")
        '''
        outputJson = {
            "pk":pk,
            "model"  : "backend.GeneralTableSubpopulationsSheltered2019",
            "fields" : {
                "subpopulation": str(subpopulation),
                "total" : int(shelteredCount)
                
                }
        }
        '''

        #jsonList.append(outputJson)
        #update variables
        pk +=1
'''
myDir = os.getcwd()
os.chdir("../../RCHIWebDash/backend/fixtures")

fileName = " GeneralTableSubpopulationsSheltered2019.json"
for eachJson in jsonList:
    print(eachJson)

print("writing to json to .../fixtures")
f = open(fileName, 'w')
f.write(json.dumps(jsonList,separators=  (",\n",":")))
print("done!")

os.chdir(myDir)
'''
#JSON schema
'''
{

    "id"
    "subpopulation
    "interview"
    "observation"
    "total"
}
'''

exit(0)