import glob
import json


url = '../../RCHIWebDash/backend/fixtures/SubpopulationsByCity2019.json'
data = json.load(open(url))

for each in data:  
    each['fields']['total'] = int(each['fields']['interview']) + int(each['fields']['observation'])


json.dump(data,open(url, 'w'))