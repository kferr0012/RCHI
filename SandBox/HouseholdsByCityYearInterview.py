import pandas as pd
import numpy as np
import json

# df = pd.read_csv('../Data/HouseholdQuestions_Cities_Districts_040119_1300.csv',encoding='cp1252')
df = pd.read_csv('../Data/2020_Modyfied.csv')


jsonFile = []

# read file
try:
    with open('./JSON/2019/HouseholdsByCityYearInterview.json', 'r') as myfile:
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

cities_d1 = ['RIVERSIDE', 'LAKE ELSINORE', 'UNINCORPORATED', 'WILDOMAR',"CANYON LAKE"]
cities_d2 = ['NORCO', 'CORONA', 'RIVERSIDE', 'JURUPA VALLEY', 'UNINCORPORATED',"EASTVALE"]
cities_d3 = ['TEMECULA', 'UNINCORPORATED', 'MURRIETA', 'HEMET', 'SAN JACINTO']
cities_d4 = ['DESERT HOT SPRINGS', 'UNINCORPORATED', 'LA QUINTA', 'COACHELLA', 'INDIAN WELLS', 'INDIO', 'PALM SPRINGS', 'CATHEDRAL CITY', 'BLYTHE', 'PALM DESERT', 'RANCHO MIRAGE',"MECCA"]
cities_d5 = ['MENIFEE', 'PERRIS', 'UNINCORPORATED', 'BEAUMONT', 'MORENO VALLEY', 'CALIMESA', 'BANNING']



# cities_d1 = df.loc[lambda df: df['DISTRICT'] == 1, ['CITYNAME']].drop_duplicates()['CITYNAME'].values.tolist()
# cities_d2 = df.loc[lambda df: df['DISTRICT'] == 2, ['CITYNAME']].drop_duplicates()['CITYNAME'].values.tolist()
# cities_d3 = df.loc[lambda df: df['DISTRICT'] == 3, ['CITYNAME']].drop_duplicates()['CITYNAME'].values.tolist()
# cities_d4 = df.loc[lambda df: df['DISTRICT'] == 4, ['CITYNAME']].drop_duplicates()['CITYNAME'].values.tolist()
# cities_d5 = df.loc[lambda df: df['DISTRICT'] == 5, ['CITYNAME']].drop_duplicates()['CITYNAME'].values.tolist()

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
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['CITYNAME'] == city))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['CITYNAME'] == city))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | ((df['Age Observed'] == 'NotSure'))))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    set_diff_df = total_Adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df.shape[0]

def get_Total_Households_OnlyChildren(in_df, city, district=None):
    total_children = in_df.loc[lambda df:\
    ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18)  & (df['CITYNAME'] == city))\
        # | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18'))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')

    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18)  & (df['CITYNAME'] == city))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')
    set_diff_df = total_children.merge(total_Adults, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df.shape[0]

def get_Total_Households_AdultsandChildren(in_df, city, district=None):
    total_adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['CITYNAME'] == city))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['CITYNAME'] == city))\
        #    | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18'))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    intersected_df = pd.merge(total_adults, total_children, how='inner').drop_duplicates(subset='ParentGlobalID')

    return intersected_df.shape[0]

def get_Total_Households_Interview(in_df, city):
    result = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview') & (df['CITYNAME'] == city), ['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID').shape[0]
    return result

for city in cities_d1:
    cityTitle =  city
    if city == "RIVERSIDE" or city == "UNINCORPORATED": cityTitle += ' 1'
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
    if city == "RIVERSIDE" or city == "UNINCORPORATED": cityTitle += ' 2'
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
    if city == "RIVERSIDE" or city == "UNINCORPORATED": cityTitle += ' 3'
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
    if city == "RIVERSIDE" or city == "UNINCORPORATED": cityTitle += ' 4'
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
    if city == "RIVERSIDE" or city == "UNINCORPORATED": cityTitle += ' 5'
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



for x in jsonData:
    x['model'] = model


jsonFields = [ x["fields"] for x in jsonData]


for d in data:
    if d['fields'] not in jsonFields:
        print("not found: ", d['fields'])
        count +=1
        d["pk"] = count
        d["model"] = model
        jsonData.append(d)




out = open('./JSON/2020/HouseholdsByCityYearInterview.json','w')

out.write (json.dumps(jsonData, cls=NpEncoder, indent=4))
out.close()