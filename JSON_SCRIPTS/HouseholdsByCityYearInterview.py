import pandas as pd
import numpy as np
import json

# df = pd.read_csv('../Data/HouseholdQuestions_Cities_Districts_040119_1300.csv',encoding='cp1252')
df = pd.read_csv('../Data/PIT2020_FEB26,2020.csv')

df = df.loc[lambda df: (df['P_Living_Situation'] != 'Couch'), :]

#! SCRIPT CHECKED 02/26/2020 JSON FINISHED 10:58 pm

jsonFile = []

# read file
try:
    with open('./JSON/2019/HouseholdsByCityYearInterview.jsonr', 'r') as myfile:
        data=myfile.read()

    jsonData = json.loads(data)

except(FileNotFoundError):
    print("[OLD JSON FILE NOT FOUND, GENERATING NEW ONE]")
    jsonData = []



year = input("Input Year: ")
model = 'backend.HouseholdsByCityYearInterview' + year 
data = []
count = len(jsonData)

print("[CREATING NEW JSON FILE]") 



#* Data Frames 
df_d1 = df.loc[lambda df: df['DISTRICT'] == 1, :]
df_d2 = df.loc[lambda df: df['DISTRICT'] == 2, :]
df_d3 = df.loc[lambda df: df['DISTRICT'] == 3, :]
df_d4 = df.loc[lambda df: df['DISTRICT'] == 4, :]
df_d5 = df.loc[lambda df: df['DISTRICT'] == 5, :]

df_d1_2 = df.loc[lambda df: (df['DISTRICT'] == 1) | (df['DISTRICT'] == 2) , :]

cities_d1 = ['RIVERSIDE', 'LAKE ELSINORE', 'UNINCORPORATED DISTRICT 1', 'WILDOMAR',"CANYON LAKE"]
cities_d2 = ['NORCO', 'CORONA', 'RIVERSIDE', 'JURUPA VALLEY', 'UNINCORPORATED DISTRICT 2',"EASTVALE"]
cities_d3 = ['TEMECULA', 'UNINCORPORATED DISTRICT 3', 'MURRIETA', 'HEMET', 'SAN JACINTO']
cities_d4 = ['DESERT HOT SPRINGS', 'UNINCORPORATED DISTRICT 4', 'LA QUINTA', 'COACHELLA', 'INDIAN WELLS', 'INDIO', 'PALM SPRINGS', 'CATHEDRAL CITY', 'BLYTHE', 'PALM DESERT', 'RANCHO MIRAGE',"MECCA"]
cities_d5 = ['MENIFEE', 'PERRIS', 'UNINCORPORATED DISTRICT 5', 'BEAUMONT', 'MORENO VALLEY', 'CALIMESA', 'BANNING']

#* Encoder To Allow Data to be converted to JSON
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

def get_Total_Households_OnlyAdults(in_df, city, district=None):
    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['CITYNAME'] == city)  & (df['ParentGlobalID'].notnull()))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['CITYNAME'] == city) & (df['ParentGlobalID'].notnull()))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | ((df['Age Observed'] == 'NotSure'))))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    set_diff_df = total_Adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df.shape[0]

def get_Total_Households_OnlyChildren(in_df, city, district=None):
    total_children = in_df.loc[lambda df:\
    ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18)  & (df['CITYNAME'] == city) & (df['ParentGlobalID'].notnull()))\
        # | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18'))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')

    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18)  & (df['CITYNAME'] == city) & (df['ParentGlobalID'].notnull()))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')
    set_diff_df = total_children.merge(total_Adults, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df.shape[0]

def get_Total_Households_AdultsandChildren(in_df, city, district=None):
    total_adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['CITYNAME'] == city) & (df['ParentGlobalID'].notnull()))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['CITYNAME'] == city) & (df['ParentGlobalID'].notnull()))\
        #    | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18'))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    intersected_df = pd.merge(total_adults, total_children, how='inner').drop_duplicates(subset='ParentGlobalID')

    return intersected_df.shape[0]

def get_Total_Households_Interview(in_df, city):
    result = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview') & (df['CITYNAME'] == city) & (df['ParentGlobalID'].notnull()), ['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID').shape[0]
    return result

for city in cities_d1:
    cityTitle =  city
    if city == "RIVERSIDE": cityTitle += ' 1'
    elif city == 'UNINCORPORATED DISTRICT 1': cityTitle = 'UNINCORPORATED 1'
    data.append({
    "fields":  {
        "year": year,
        "district": 1,
        "city": cityTitle,
        "totalHouseholds": get_Total_Households_Interview(df_d1, city),
        "adultsOnly": get_Total_Households_OnlyAdults(df_d1, city),
        "adultsAndChildren":get_Total_Households_AdultsandChildren(df_d1, city),
        "childrenOnly": get_Total_Households_OnlyChildren(df_d1, city),
    }
    })

for city in cities_d2:
    cityTitle =  city
    if city == "RIVERSIDE": cityTitle += ' 2'
    elif city == 'UNINCORPORATED DISTRICT 2': cityTitle = 'UNINCORPORATED 2'
    data.append({
    "fields":  {
        "year": year,
        "district": 2,
        "city": cityTitle,
        "totalHouseholds": get_Total_Households_Interview(df_d2, city),
        "adultsOnly": get_Total_Households_OnlyAdults(df_d2, city),
        "adultsAndChildren":get_Total_Households_AdultsandChildren(df_d2, city),
        "childrenOnly": get_Total_Households_OnlyChildren(df_d2, city),
    }
    })

for city in cities_d3:
    cityTitle =  city
    if city == 'UNINCORPORATED DISTRICT 3': cityTitle = 'UNINCORPORATED 3'
    data.append({
    "fields":  {
        "year": year,
        "district": 3,
        "city": cityTitle,
        "totalHouseholds": get_Total_Households_Interview(df_d3, city),
        "adultsOnly": get_Total_Households_OnlyAdults(df_d3, city),
        "adultsAndChildren":get_Total_Households_AdultsandChildren(df_d3, city),
        "childrenOnly": get_Total_Households_OnlyChildren(df_d3, city),
    }
    })

for city in cities_d4:
    cityTitle =  city
    if city == 'UNINCORPORATED DISTRICT 4': cityTitle = 'UNINCORPORATED 4'
    data.append({
    "fields":  {
        "year": year,
        "district": 4,
        "city": cityTitle,
        "totalHouseholds": get_Total_Households_Interview(df_d4, city),
        "adultsOnly": get_Total_Households_OnlyAdults(df_d4, city),
        "adultsAndChildren":get_Total_Households_AdultsandChildren(df_d4, city),
        "childrenOnly": get_Total_Households_OnlyChildren(df_d4, city),
    }
    })
    
for city in cities_d5:
    cityTitle =  city
    if city == 'UNINCORPORATED DISTRICT 5': cityTitle = 'UNINCORPORATED 5'
    data.append({
    "fields":  {
        "year": year,
        "district": 5,
        "city": cityTitle,
        "totalHouseholds": get_Total_Households_Interview(df_d5, city),
        "adultsOnly": get_Total_Households_OnlyAdults(df_d5, city),
        "adultsAndChildren":get_Total_Households_AdultsandChildren(df_d5, city),
        "childrenOnly": get_Total_Households_OnlyChildren(df_d5, city),
    }
    })

for city in ["RIVERSIDE"]:
    cityTitle =  city
    data.append({
    "fields":  {
        "year": year,
        "district": "1+2",
        "city": cityTitle,
        "totalHouseholds": get_Total_Households_Interview(df_d1_2, city),
        "adultsOnly": get_Total_Households_OnlyAdults(df_d1_2, city),
        "adultsAndChildren":get_Total_Households_AdultsandChildren(df_d1_2, city),
        "childrenOnly": get_Total_Households_OnlyChildren(df_d1_2, city),
    }
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




out = open('./JSON/2020/HouseholdsByCityYearInterview.json','w')

out.write (json.dumps(jsonData, cls=NpEncoder, indent=4))
out.close()