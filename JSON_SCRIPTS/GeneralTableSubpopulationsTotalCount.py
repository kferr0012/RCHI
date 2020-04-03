import json 

totalData = []

with open('./JSON/2020/GeneralTableSubpopulations.json') as f:
    unshelteredData = json.load(f)

with open('./JSON/2020/GeneralTableSubpopulationsSheltered.json') as d:
    shelteredData = json.load(d)

pkID = 1
model = 'GeneralTableSubpopulationsTotalCounts'

def fieldProperties(category,subpopulation,year,_type,interview,observation,total):
    return {'category':category, 'subpopulation': subpopulation, 'year': year, '_type':_type, 'interview':interview, 'observation':observation, 'total':total}


for shelteredDataID in shelteredData:
    for unshelteredID in unshelteredData:
        if((shelteredDataID['fields']['subpopulation'] == unshelteredID['fields']['subpopulation'])\
            and (shelteredDataID['fields']['category'] == unshelteredID['fields']['category'])):
            category = shelteredDataID['fields']['category']
            subpopulation = shelteredDataID['fields']['subpopulation']
            year = 2020
            _type = 'Total Count'
            interview = shelteredDataID['fields']['interview'] + unshelteredID['fields']['interview']
            observation = shelteredDataID['fields']['observation'] + unshelteredID['fields']['observation']
            total = interview + observation



            newObject = {"pk":pkID, "model":model, 'fields':fieldProperties(category,subpopulation,year,_type,interview,observation,total)}
            totalData.append(newObject)
            pkID +=1

print(totalData)
