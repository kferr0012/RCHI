import os
import json
curDir = os.getcwd()
os.chdir("../../RCHIWebDash/backend/fixtures")



data = None
with open("HouseholdsByCityYearInterview.json", "r") as read_file:
    data = json.load(read_file)

pk = "##"
model = "backend.GeneralTableSubpopulationsSheltered2019"
'''
fields: 

newJson = {
        "pk" : pk,
        "model": model,
        "fields" : {
            "category"
            "subpopulation" : "Households"
            
        }}
'''


#preprocess household data

subpopulationDict = {
    "Adults Only" : 0,
    "Children Only": 0,
    "Adults and Children": 0,
    "Total" : 0
    }
for eachLine in data:
    row = tuple(eachLine["fields"])
    subpopulationDict["Children Only"] += int(eachLine["fields"]["childrenOnly"])
    subpopulationDict["Adults and Children"] = int(eachLine["fields"]["adultsAndChildren"])
    subpopulationDict["Total"] += int(eachLine["fields"]['totalHouseholds'])
    subpopulationDict["Adults Only"] += int(eachLine["fields"]["adultsOnly"])

    

for eachKey in subpopulationDict.keys():
    newJson = {
        "pk" : pk,
        "model": model,
        "fields" : {
            "category" : "Households",
            "subpopulation" : eachKey,
            "total": subpopulationDict[eachKey]
            
        }}

    print(json.dumps(newJson))



os.chdir(curDir)