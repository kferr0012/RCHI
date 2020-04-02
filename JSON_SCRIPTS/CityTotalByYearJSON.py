import pandas as pd
import numpy as np
import json


# df = pd.read_csv('../Data/HouseholdQuestions_Cities_Districts_040119_1300.csv',encoding='cp1252')
df = pd.read_csv('../Data/PIT2020_FEB26,2020.csv')

df = df.loc[lambda df: (df['P_Living_Situation'] != 'Couch'), :]


#! SCRIPT CHECKED 02/26/2020 11:27 JSON FINISHED

jsonFile = []

# read file
try:
    with open('./JSON/2019/CityTotalsByYear.json', 'r') as myfile:
        data=myfile.read()

    jsonData = json.loads(data)

except(FileNotFoundError):
    print("[OLD JSON FILE NOT FOUND, GENERATING NEW ONE]")
    jsonData = []


year = input("Input Year: ")
model = 'backend.CityTotalsByYear' + year 
data = []
count = len(jsonData)

print("[CREATING NEW JSON FILE]")


df_d1 = df.loc[lambda df: df['DISTRICT'] == 1, :]
df_d2 = df.loc[lambda df: df['DISTRICT'] == 2, :]
df_d3 = df.loc[lambda df: df['DISTRICT'] == 3, :]
df_d4 = df.loc[lambda df: df['DISTRICT'] == 4, :]
df_d5 = df.loc[lambda df: df['DISTRICT'] == 5, :]


cities_d1 = ['RIVERSIDE', 'LAKE ELSINORE', 'UNINCORPORATED DISTRICT 1', 'WILDOMAR',"CANYON LAKE"]
cities_d2 = ['NORCO', 'CORONA', 'RIVERSIDE', 'JURUPA VALLEY', 'UNINCORPORATED DISTRICT 2',"EASTVALE"]
cities_d3 = ['TEMECULA', 'UNINCORPORATED DISTRICT 3', 'MURRIETA', 'HEMET', 'SAN JACINTO']
cities_d4 = ['DESERT HOT SPRINGS', 'UNINCORPORATED DISTRICT 4', 'LA QUINTA', 'COACHELLA', 'INDIAN WELLS', 'INDIO', 'PALM SPRINGS', 'CATHEDRAL CITY', 'BLYTHE', 'PALM DESERT', 'RANCHO MIRAGE',"MECCA"]
cities_d5 = ['MENIFEE', 'PERRIS', 'UNINCORPORATED DISTRICT 5', 'BEAUMONT', 'MORENO VALLEY', 'CALIMESA', 'BANNING']


class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(NpEncoder, self).default(obj)


def get_Total_CityByYear(in_df, city, year, district = None):
    total =  in_df.loc[lambda df: (df['CITYNAME'] == city), ['ParentGlobalID']].shape[0]

    citytitle = city
    if city == "RIVERSIDE":
        citytitle += "*"
    elif 'UNINCORPORATED' in city:
        citytitle = 'Unincorporated'

    return {"year": str(year), "district": str(district), "sheltered": "False", "city": citytitle.title(),"total": str(total), "volunteers": ""}

for city in cities_d1:
    data.append({
    "fields":  get_Total_CityByYear(df_d1,city, year, 1)
    })

for city in cities_d2:
    data.append({
    "fields":  get_Total_CityByYear(df_d2,city, year, 2)
    })

for city in cities_d3:
    data.append({
    "fields":  get_Total_CityByYear(df_d3,city, year, 3)
    })

for city in cities_d4:
    data.append({
    "fields":  get_Total_CityByYear(df_d4,city, year, 4)
    })

for city in cities_d5:
    data.append({
    "fields":  get_Total_CityByYear(df_d5,city, year, 5)
    })


for x in jsonData:
    x['model'] = model
    x['fields']['_type'] = 'Unsheltered'




jsonFields = [ x["fields"] for x in jsonData]



for d in data:
    if d['fields'] not in jsonFields:
        print("not found: ", d['fields'])
        count +=1
        d["pk"] = count
        d["model"] = model
        d['fields']['_type'] = 'Unsheltered'
        jsonData.append(d)


out = open('./JSON/2020/CityTotalsByYear.json','w')

out.write (json.dumps(jsonData, cls=NpEncoder, indent=4))
out.close()