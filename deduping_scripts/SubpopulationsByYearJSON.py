import pandas as pd
import numpy as np
import json
import sys

#df = pd.read_csv('../Data/HouseholdQuestions_Cities_Districts_040119_1300.csv',encoding='cp1252')

print("CREATING COUNTS")

print("====metadata====")
print("year:" + str(sys.argv[1]))
print("final data path:" + str(sys.argv[2]))
print("output path: " + str(sys.argv[3]))
print("encoding: " + str(sys.argv[4]))

finalDataPath = './final_data/final_data.csv'
df = pd.read_csv(str(sys.argv[2]),encoding=str(sys.argv[4]))

jsonFile = []

# read file
try:
    with open('./JSON/2019/SubpopulationsByYear.json', 'r') as myfile:
        data=myfile.read()

    jsonData = json.loads(data)

except(FileNotFoundError):
    print("[OLD JSON FILE NOT FOUND, GENERATING NEW ONE]")
    jsonData = []


#year = input("Input Year: ")
year = str(sys.argv[1])

model = "backend.SubpopulationsByYear" + year

newData = []
count = len(jsonData)
print("LEN JSONDATA: ", count)

print("[WRITING DATA IN JSON]")

subpopulationCategory = ['Yes']
veteransSubpopulation = ['Veteran Yes']
ageCategory = ('youth', 'Under24')
ageSubpopulation = ['Youth (18-24)']

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

def get_Total_Veterans(in_df, year):
    interview =  in_df.loc[lambda df: ((df['United States Armed Forces'] == 'Yes')), :].shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation,"total": interview+ observation ,"subpopulation": 'Veteran Yes', 'sheltered': False}

def get_Total_Youth(in_df, year):
    interview =  in_df.loc[lambda df: (((df['Age As Of Today'] < 25) & (df['Age As Of Today'] >= 18)) ), :].shape[0]
    observation = in_df.loc[lambda df: ((df['Age Observed'] == 'Under24')  ), :].shape[0]

    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total" : interview + observation, "subpopulation": 'Youth (18-24)', 'sheltered': False}

def get_Total_ChronicHomeless(in_df,year):

    ChronicallyHomelessHouseholds = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1) )\
        #    | ((df['Household Survey Type'] == 'Observation') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview'))\
            # | ((df['Household Survey Type'] == 'Observation'))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(ChronicallyHomelessHouseholds['ParentGlobalID']).sum()
    
    interview = total_persons
    observation = 0 
    
    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total": interview + observation , "subpopulation": 'Chronically Homeless', 'sheltered': False}
 
def get_Total_Interview_withChild(in_df, year):
    total_adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')
    
    interview = pd.merge(total_adults, total_children, how='inner').drop_duplicates(subset='ParentGlobalID').shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total": interview + observation, "subpopulation": 'Families with Children', 'sheltered': False}

def get_Total_Elderly(in_df,year):
    interview = in_df.loc[lambda df: (df['Age As Of Today'] >=62) & (df['Household Survey Type'] == 'Interview'), :].shape[0]
    observation = 0
    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total": interview + observation, "subpopulation": 'Elderly (>62)', 'sheltered': False}

def get_SubstanceAbuse(in_df, year):
    interview = in_df.loc[lambda df: (df['Substance Abuse'] == "Yes"), :].shape[0] 
    observation = 0
    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation,"total": interview + observation, "subpopulation": 'Substance Abuse', 'sheltered': False}

def get_DomesticViolence(in_df, year):
    interview = in_df.loc[lambda df: (df['Domestic Violence Victim'] == "Yes"), :].shape[0] 
    observation = 0
    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation,"total": interview + observation, "subpopulation": 'Victim of Domestic Violence', 'sheltered': False}

def get_Total_Jail12Months(in_df,year):
    interview = in_df.loc[lambda df: (df['Jail Or Prison'] == "Yes") | (df['Jail Or Prison'] == "YesTwelveMonths") | (df['Jail Or Prison'] == "YesNinetyDays"), :].shape[0]
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total": interview + observation, "subpopulation": 'Jail Release 12 Months', 'sheltered': False}

def get_Total_MentalHealthCondition(in_df, year):
    interview = in_df.loc[lambda df: (df['Mental Health Issue'] == 'Yes'), :].shape[0] 
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total": interview + observation, "subpopulation": 'Mental Health Conditions', 'sheltered': False}

def get_Total_AIDSorHIV(in_df, year):
    interview = in_df.loc[lambda df: (df['HIV/AIDS'] == 'Yes'), :].shape[0] 
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total": interview + observation, "subpopulation": 'AIDS or HIV', 'sheltered': False}

def get_Total_PTSD(in_df, year):
    interview = in_df.loc[lambda df: (df['PTSD'] == 'Yes'), :].shape[0] 
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total": interview + observation, "subpopulation": 'PTSD', 'sheltered': False}

def get_Total_BrainInjury(in_df, year):
    interview = in_df.loc[lambda df: (df['Brain Injury'] == 'Yes'), :].shape[0] 
    observation = 0

    return {"year": year ,"category": "Subpopulations", "interview": interview ,"observation": observation, "total": interview + observation, "subpopulation": 'Brain Injury', 'sheltered': False}

newData.append({
"fields":  get_Total_Veterans(df, year)
})


newData.append({
"fields":  get_Total_Youth(df,year)
})


newData.append({
        "fields":  get_Total_ChronicHomeless(df,year)
        })


newData.append({
        "fields":  get_Total_Interview_withChild(df,year)
        })


newData.append({
        "fields":  get_Total_Elderly(df,year)
        })


newData.append({
        "fields":  get_SubstanceAbuse(df,year)
        })


newData.append({
        "fields":  get_DomesticViolence(df,year)
        })


newData.append({
        "fields":  get_Total_Jail12Months(df,year)
        })


newData.append({
        "fields":  get_Total_MentalHealthCondition(df,year)
        })


newData.append({
        "fields":  get_Total_AIDSorHIV(df,year)
        })


newData.append({
        "fields":  get_Total_PTSD(df,year)
        })


newData.append({
        "fields":  get_Total_BrainInjury(df,year)
        })

newData.append({
        "fields":  get_Total_BrainInjury(df,year)
        })

# print(jsonData["fields"])

jsonFields = [ x["fields"] for x in jsonData]

for d in newData:
    if d['fields'] not in jsonFields:
        print("not found")
        count +=1
        d["pk"] = count
        d["model"] = model
        jsonData.append(d)




#out = open('./JSON/2019/SubpopulationsByYearssssssssss.json','w')
out = open(str(sys.argv[3]),'w')

out.write (json.dumps(jsonData, cls=NpEncoder, indent=4))
out.close()

print("[FINISHED WRITING DATA INTO JSON]")

 
