import json

'''
Kevin Frazier

This script makes the counts of Unsheltered + Sheltered
-uses the already existing tables in Django that were initially created
-creates a json where _type is "Total" and the count = Unsheltered.count + Sheltered.count
'''

Unsheltered = '../../RCHIWebDash/backend/fixtures/2020/GeneralTableSubpopulations.json'
Sheltered = '../../RCHIWebDash/backend/fixtures/2020/GeneralTableSubpopulationsSheltered.json'
year = 2020
model = "backend.GeneralTableSubpopulationsTotalCounts"
outputDir = model.split(".")[1]+".json"
unshelteredData = json.load(open(Unsheltered))
shelteredData = json.load(open(Sheltered))

#layout unsheltered data in a map
countMap = {}

def getCounts(data):
    for myJson in data:
        
        payload = myJson["fields"]

        if payload["category"] != "Living Situation":
            if payload["category"] not in countMap:
                countMap[payload["category"]] = {}
            if payload["subpopulation"] not in countMap[payload["category"]]:
                countMap[payload["category"]][payload["subpopulation"]] = {
                    "interview" : 0,
                    "observation" : 0,
                    "total" : 0
                }
                
            countMap[payload["category"]][payload["subpopulation"]]["interview"] += int(payload["interview"])
            countMap[payload["category"]][payload["subpopulation"]]["observation"] += int(payload["observation"])
            countMap[payload["category"]][payload["subpopulation"]]["total"] += int(payload["total"])

def convertMapToJson():

    jsonList = []
    pk = 1
    
    for category in countMap:
        print(category)
        for subpopulation in countMap[category]:
            fields = countMap[category][subpopulation]
            print("\t" + str(subpopulation) + ": {" + str(fields["interview"]) + "," + str(fields["observation"]) + "," + str(fields["total"])+ "}" )
            
            newJson = {
                "pk" : pk,
                "model" : model,
                "fields" : {
                    "category" : category,
                    "subpopulation" : subpopulation,
                    "year" : year,
                    "_type" : "Total Count",
                    "interview" : fields["interview"] ,
                    "observation" : fields["observation"] ,
                    "total" : fields["total"] 
                }
            }
            pk+=1
            jsonList.append(newJson)


    return jsonList

def main():

    getCounts(unshelteredData)
    getCounts(shelteredData)

    print("\n\nOUTPUT JSON \n\n")
    json.dump(convertMapToJson(),open(outputDir, 'w'))
    
    return 0

if __name__ == "__main__":
    main()