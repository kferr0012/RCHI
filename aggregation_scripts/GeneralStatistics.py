'''
This script gets the aggregate counts of the subpopulation directory below
'''

    
'''
Goal:
aggregate the counts so that we have one of each wanted index (nivo sucks)
example Json:
{
id: 1
year 2019
category: Race -> not unique
subpopulation: Asian -> unique index
interviews:
observation:
total: {interview} + {observation}
}

Pseudo:

outputjsons = []
for eachjson in jsons
    newjson = {}
    newjson[eachjson[category]][eachjson[subpopulation]] = {interview, observation, interview + observation}
'''

import json

directory = "../RCHIWebDash/backend/fixtures/SubpopulationsByCity2019.json"

data = NotImplemented
with open(directory, "r") as read_file:
    data = json.load(read_file)


outputJSONs = []
id = 1

#get aggregate counts for each subpopulation
subpopulationDict = {}
for row in data:
    category = row['fields']['category']
    subpopulation = row['fields']['subpopulation']
    interview = row['fields']['interview']
    observation = row['fields']['observation']
    total = int(interview) + int(observation)

    if category not in subpopulationDict:
        subpopulationDict[category] = {}

    if subpopulation not in subpopulationDict[category]:
        subpopulationDict[category][subpopulation] = {"interview" : 0,
                                                        "observation" : 0,
                                                        "total" :  0}
        
    subpopulationDict[category][subpopulation]["interview"] += int(interview)
    subpopulationDict[category][subpopulation]["observation"] += int(observation)
    subpopulationDict[category][subpopulation]["total"] += int(total)

#print("subpopulation Dict")
#print(subpopulationDict)


#create every subpopulation as a same dimension json
jsonList = []
id = 1
print("[", end = "")
for eachCategory in subpopulationDict.keys():
    for eachSubpopulation in subpopulationDict[eachCategory].keys():
        output = {}
        newjson = {}
        newjson["category"] = eachCategory
        newjson["subpopulation"] = eachSubpopulation
        newjson["interview"] = subpopulationDict[eachCategory][eachSubpopulation]["interview"]
        newjson["observation"] = subpopulationDict[eachCategory][eachSubpopulation]["observation"]
        newjson["total"] = subpopulationDict[eachCategory][eachSubpopulation]["total"]

        output["pk"] = id
        output["model"] = "backend.GeneralTableSubpopulations2019"
        output["fields"] = newjson
        print(json.dumps(output), end= "")
        print(",")
        id+=1
print("]", end = "")

print("jsonList")
print(jsonList)

exit(0)


print("[",end = "")
for row in data:
    output = {}

    newjson = {}
    newjson["id"] = id
    newjson["category"] = row['fields']["category"]
    newjson["subpopulation"] = row['fields']["subpopulation"]
    newjson['interview'] = row['fields']['interview']
    newjson['observation'] = row['fields']['observation']
    newjson['total'] =  int(row['fields']['interview']) + int(row['fields']['observation'] )

    output["pk"] = id
    output["model"] = "backend.GeneralTableSubpopulations2019"
    output["fields"] = newjson
    id+=1
    print(json.dumps(output), end = "")
    print(",")

print("]", end = "")



outputDir = "../RCHIWebDash/backend/fixtures/GeneralSubpopulation2019.json"

    
