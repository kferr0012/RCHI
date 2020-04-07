import pandas as pd
import numpy as np
import json



# df = pd.read_csv('../Data/HouseholdQuestions_Cities_Districts_040119_1300.csv',encoding='cp1252')
df = pd.read_csv('../Data/PIT2020_FEB26,2020.csv')

df = df.loc[lambda df: (df['P_Living_Situation'] != 'Couch'), :]

jsonFile = []

# read file
try:
    with open('./JSON/2019/CityTotalsByYear.jsonsssss', 'r') as myfile:
        data=myfile.read()

    jsonData = json.loads(data)

except(FileNotFoundError):
    print("[OLD JSON FILE NOT FOUND, GENERATING NEW ONE]")
    jsonData = []


year = input("Input Year: ")
model = 'backend.SubpopulationsByCity' + year 
data = []
count = len(jsonData)

print("[CREATING NEW JSON FILE]")



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


allCities = [cities_d1,cities_d2,cities_d3,cities_d4,cities_d5]
allDistricts = [df_d1, df_d2, df_d3,df_d4,df_d5]

#! SCRIPT CHECKED 02/28/2020 JSON FINISHED 02:36 pm



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

# * Variable Declarations
raceCategory = [('Asian','Asian'),('AmericanIndian','AmericanIndian'),('Black','Black'),('White','White'),('Multiple','Multiple'),('NativeHawaiian','NativeHawaiian'),('DoesntKnow','NotSure'), 'Total']
raceSubpopulation = ['Asian', 'American Indian', 'Black', 'White', 'Multiple Races', 'Native Hawaiian', 'Unknown Race', 'Total']
ethnicityCategory = [("Yes", "Hispanic"), ("No", "NonHispanic"), ("DoesntKnow", "NotSure"),'Total']
ethnicitySubpopulation = ["Hispanic", "NonHispanic", "Unknown Ethnicity", 'Total']
genderCategory = [('Male','Male'), ('Female','Female'), ('Transgender', 'Transgender'), ('GenderNonConforming','GenderNonConforming'), ('DoesntKnow','NotSure'), 'Total']
genderSubpopulation = ['Male', 'Female', 'Transgender', 'Gender Non-Conforming', 'Unknown Gender', 'Total']
ageCategory = [('adult', 'Over25'), ('youth', 'Under24'), ('child', 'Under18'), ('DoesntKnow','NotSure'), 'Total']
ageSubpopulation = ['Adults (>24)', 'Youth (18-24)', 'Children (<18)', 'Unknown Age', 'Total']

subpopulationCategory = ['Yes', 'No' , 'DoesntKnow']
veteransSubpopulation = ['Veteran Yes', 'Veteran No']
substanceAbuseSubpopulation = ['Substance Abuse', 'No Substance Abuse', 'Unknown Substance Abuse']
ptsdSubpopulation = ['PTSD', 'No PTSD', 'Unknown PTSD']
mentalHealthSubpopulation = ['Mental Health Conditions', 'No Mental Health Conditions', 'Unknown Mental Health Conditions']
physicalDisabilitySubpopulation = ['Physical Disability', 'No Physical Disability', 'Unknown Physical Disability']
developmentDisabilitySubpopulation = ['Developmental Disability', 'No Developmental Disability', 'Unknown Developmental Disability']
brainInjurySubpopulation =  ['Brain Injury', 'No Brain Injury', 'Unknown Brain Injury']
domesticViolenceSubpopulation = ['Victim of Domestic Violence', 'Not Victim of Domestic Violence','Unknown Victim of Domestic Violence']
aidsOrhivSubpopulation = ['AIDS or HIV', 'No AIDS or HIV' , 'Unknown AIDS or HIV']
jailYesCategory = ['Probation', 'Parole', 'CompletedSentence', 'DoesntKnow']
jail90DaysSubpopulation = ['Jail Release 90 Days: Probation', 'Jail Release 90 Days: Parole', 'Jail Release 90 Days: Completed Sentence', 'Jail Release 90 Days: (Unspecified)']
jail12MonthsSubpopulation = ['Jail Release 12 Months: Probation', 'Jail Release 12 Months: Parole','Jail Release 12 Months: Completed Sentence', 'Jail Release 12 Months: (Unspecified)']
jailCategory = ['No', 'DoesntKnow']
jailNoSubpopulation = ['No Jail', 'Unknown Jail']


def get_race_count(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Total':
        interview = in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview') & (df['GlobalID'].notnull()) , ['Race']].shape[0]
        observation = in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation') & (df['GlobalID'].notnull()), ['Race Observed']].shape[0]
    elif subpopulation == 'Multiple Races':
        interview =  in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview') & (df['Race'].str.contains(pat=',')) & (df['GlobalID'].notnull()), :].shape[0]
        observation =  in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation') & (df['Race Observed'].str.contains(pat=',')) & (df['GlobalID'].notnull()), :].shape[0]
    elif subpopulation == 'Unknown Race':
        interview =  in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview') & ((df['Race'] == value[0]) | (df['Race'].isnull())) & (df['GlobalID'].notnull()), :].shape[0]
        observation = in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation') & ((df['Race Observed'] == value[1]) | (df['Race Observed'].isnull()))& (df['GlobalID'].notnull()), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview') & (df['Race'] == value[0]) & (df['GlobalID'].notnull()), :].shape[0]
        observation = in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == value[1]) & (df['GlobalID'].notnull()), :].shape[0]

    return {"category": "Race", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_ethnicity_count(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Total':
        interview = in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview') & (df['GlobalID'].notnull()), ['Ethnicity']].shape[0]
        observation = in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation') & (df['GlobalID'].notnull()), ['Hispanic Observed']].shape[0]
    elif subpopulation == 'Unknown Ethnicity':
        interview =  in_df.loc[lambda df: (((df['Ethnicity'] == value[0]) | (df['Ethnicity'].isnull())) & (df['Household Survey Type'] == 'Interview') & (df['CITYNAME'] == city)  & (df['GlobalID'].notnull())), :].shape[0]
        observation = in_df.loc[lambda df: (((df['Hispanic Observed'] == value[1]) | (df['Hispanic Observed'].isnull())) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation') & (df['GlobalID'].notnull())), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['Ethnicity'] == value[0])  & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview') & (df['GlobalID'].notnull())), :].shape[0]
        observation = in_df.loc[lambda df: ((df['Hispanic Observed'] == value[1]) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation') & (df['GlobalID'].notnull())), :].shape[0]


    return {"category": "Ethnicity", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_gender_count(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Total':
        interview = in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview') & (df['GlobalID'].notnull()) , ['Gender']].shape[0]
        observation = in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation') & (df['GlobalID'].notnull()), ['Gender Observed']].shape[0]
    elif subpopulation == "Unknown Gender":
        interview =  in_df.loc[lambda df: ( (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview') & ((df['Gender'] == value[0]) | (df['Gender'].isnull())) & (df['GlobalID'].notnull())), :].shape[0]
        observation = in_df.loc[lambda df: ( (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation') &((df['Gender Observed'] == value[1]) | (df['Gender Observed'].isnull()))  & (df['GlobalID'].notnull())), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ( (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview') & (df['Gender'] == value[0]) & (df['GlobalID'].notnull())), :].shape[0]
        observation = in_df.loc[lambda df: ( (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation') & (df['Gender Observed'] == value[1]) & (df['GlobalID'].notnull())), :].shape[0]

    return {"category": "Gender", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_age_count(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Total':
        interview = in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview'), ['Age As Of Today']].shape[0]
        observation = in_df.loc[lambda df: (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation'), ['Age Observed']].shape[0]

    elif value[0] == 'child':
        interview =  in_df.loc[lambda df: ((df['CITYNAME'] == city) &  (df['Age As Of Today'] < 18) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
        observation = in_df.loc[lambda df: ((df['CITYNAME'] == city) & (df['Age Observed'] == value[1]) & (df['Household Survey Type'] == 'Observation')), :].shape[0]

    elif value[0] == 'youth':
        interview =  in_df.loc[lambda df: (((df['Age As Of Today'] < 25) & (df['Age As Of Today'] >= 18)) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview' )), :].shape[0]
        observation = in_df.loc[lambda df: ((df['Age Observed'] == value[1]) & (df['CITYNAME'] == city) &  (df['Household Survey Type'] == 'Observation')), :].shape[0]

    elif value[0] == 'adult':
        interview =  in_df.loc[lambda df: ((df['Age As Of Today'] >=25) & (df['CITYNAME'] == city) &   (df['Household Survey Type'] == 'Interview')), :].shape[0]
        observation = in_df.loc[lambda df: ((df['Age Observed'] == value[1]) &  (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Observation')), :].shape[0]
    elif value[0] == 'DoesntKnow':
        interview =  in_df.loc[lambda df: (((df['Age As Of Today'] == value[0]) | (df['Age As Of Today'].isnull())) & (df['CITYNAME'] == city) &  (df['Household Survey Type'] == 'Interview')), :].shape[0]
        observation = in_df.loc[lambda df: (((df['Age Observed'] == value[1]) | (df['Age Observed'].isnull())) & (df['CITYNAME'] == city) &  (df['Household Survey Type'] == 'Observation')), :].shape[0]

    return {"category": "Age", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_Veterans(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Veteran No':
        interview =  in_df.loc[lambda df: (((df['United States Armed Forces'] == value) | (df['United States Armed Forces'] == 'DoesntKnow') | (df['United States Armed Forces'].isnull())) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['United States Armed Forces'] == value) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_ChronicHomeless(in_df,city,cityTitle, district=None):

    ChronicallyHomelessHouseholds = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1) & (df['CITYNAME'] == city) &(df['ParentGlobalID'].notnull()))\
        #    | ((df['Household Survey Type'] == 'Observation') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['CITYNAME'] == city) &(df['ParentGlobalID'].notnull()))\
            # | ((df['Household Survey Type'] == 'Observation'))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(ChronicallyHomelessHouseholds['ParentGlobalID']).sum()
    
    interview = total_persons
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": 'Chronically Homeless', "total": interview + observation}

def get_Total_NotChronicHomeless(in_df,city,cityTitle, district=None):
    totalCountInterview = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview') & (df['CITYNAME'] == city) & (df['ParentGlobalID'].notnull()), :].shape[0]
    # totalCountObserved = in_df.loc[lambda df: (df['Household Survey Type'] == 'Observation') & (df['CITYNAME'] == city) & (df['ParentGlobalID'].notnull()), :].shape[0] 

    ChronicallyHomelessHouseholds = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1) & (df['CITYNAME'] == city) &(df['ParentGlobalID'].notnull()))\
        #    | ((df['Household Survey Type'] == 'Observation') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['CITYNAME'] == city) & (df['ParentGlobalID'].notnull()))\
            # | ((df['Household Survey Type'] == 'Observation'))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(ChronicallyHomelessHouseholds['ParentGlobalID']).sum()

    interview = totalCountInterview - total_persons
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": 'Not Chronically Homeless', "total": interview + observation}

def get_Total_SubstanceAbuse(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Unknown Substance Abuse':
        interview =  in_df.loc[lambda df: (((df['Substance Abuse'] == value) | (df['Substance Abuse'].isnull()) ) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['Substance Abuse'] == value) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_PTSD(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Unknown PTSD':
        interview =  in_df.loc[lambda df: (((df['PTSD'] == value) | (df['PTSD'].isnull()) ) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['PTSD'] == value) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_MentalHealthCondition(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Unknown Mental Health Conditions':
        interview =  in_df.loc[lambda df: (((df['Mental Health Issue'] == value) | (df['Mental Health Issue'].isnull()) ) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['Mental Health Issue'] == value) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]

    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_PhysicalDisability(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Unknown Physical Disability':
        interview =  in_df.loc[lambda df: (((df['Physical Disability'] == value) | (df['Physical Disability'].isnull()) ) &  (df['CITYNAME'] == city)  & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['Physical Disability'] == value) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]

    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_DevelopmentDisability(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Unknown Developmental Disability':
        interview =  in_df.loc[lambda df: (((df['Developmental Disability'] == value) | (df['Developmental Disability'].isnull()) ) & (df['CITYNAME'] == city)  & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['Developmental Disability'] == value) & (df['CITYNAME'] == city)  & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    
    observation =0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_BrainInjury(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Unknown Brain Injury':
        interview =  in_df.loc[lambda df: (((df['Brain Injury'] == value) | (df['Brain Injury'].isnull()) ) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['Brain Injury'] == value) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]

    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_DomesticViolence(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Unknown Victim of Domestic Violence':
        interview =  in_df.loc[lambda df: (((df['Domestic Violence Victim'] == value) | (df['Domestic Violence Victim'].isnull()) ) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['Domestic Violence Victim'] == value) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]

    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_AidsOrHiv(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Unknown AIDS or HIV':
        interview =  in_df.loc[lambda df: (((df['HIV/AIDS'] == value) | (df['HIV/AIDS'].isnull()) ) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['HIV/AIDS'] == value) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]

    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_Jail90Days(in_df, value, city, cityTitle, district= None, subpopulation= None):
    interview =  in_df.loc[lambda df: ((df['Jail Or Prison'] == 'YesNinetyDays')  & (df['Probation Or Parole'] == value) & (df['CITYNAME'] == city)), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_Jail12Months(in_df, value, city, cityTitle, district= None, subpopulation= None):
    interview =  in_df.loc[lambda df: ((df['Jail Or Prison'] == 'YesTwelveMonths')  & (df['Probation Or Parole'] == value) & (df['CITYNAME'] == city)), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_NonJailCount(in_df, value, city, cityTitle, district= None, subpopulation= None):
    if subpopulation == 'Unknown Jail':
        interview =  in_df.loc[lambda df: (((df['Jail Or Prison'] == value) | (df['Jail Or Prison'].isnull())) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    else:
        interview =  in_df.loc[lambda df: ((df['Jail Or Prison'] == value) & (df['CITYNAME'] == city) & (df['Household Survey Type'] == 'Interview')), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": subpopulation, "total": interview + observation}

def get_Total_Households_OnlyAdults(in_df, city, cityTitle, district=None):
    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['CITYNAME'] == city) & (df['ParentGlobalID'].notnull()))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['CITYNAME'] == city) & (df['ParentGlobalID'].notnull()))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | ((df['Age Observed'] == 'NotSure'))))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    set_diff_df = total_Adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    interview = set_diff_df.shape[0]
    observation = 0


    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": 'Adults Only', "total": interview + observation}

def get_Total_Households_OnlyChildren(in_df, city,cityTitle, district=None):
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

    interview = set_diff_df.shape[0]
    observation = 0


    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": 'Children Only',"total": interview + observation}

def get_Total_Households_AdultsandChildren(in_df, city,cityTitle, district=None):
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

    interview = intersected_df.shape[0]
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": 'Families with Children',"total": interview + observation}

def get_Total_Individuals(in_df,city,cityTitle,district=None):
    interview =  in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview') & (df['GlobalID'].notnull()) & (df['CITYNAME'] == city), ['GlobalID']].drop_duplicates(subset='GlobalID').shape[0]
    observation =  in_df.loc[lambda df: (df['Household Survey Type'] == 'Observation') & (df['GlobalID'].notnull()) & (df['CITYNAME'] == city), ['GlobalID']].drop_duplicates(subset='GlobalID').shape[0]

    return {"category": "Individuals", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": 'Individuals',"total": interview + observation}

def get_Total_PetOwner(in_df,city,cityTitle,district=None):
    interview = in_df.loc[lambda df: (df['Companion Animal'] == 'Yes') & (df['Number of Animal'] >= 1) & (df['Household Survey Type'] == 'Interview') & (df['CITYNAME'] == city), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": 'Pet Owners',"total": interview + observation}

def get_NewlyHomeless(in_df,city,cityTitle,district=None):
    interview = in_df.loc[lambda df: (df['First Time Homeless'] == 'Yes') & (df['Household Survey Type'] == 'Interview') & (df['CITYNAME'] == city), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": 'Newly Homeless',"total": interview + observation}

def get_Seniors(in_df,city,cityTitle,district=None):
    interview = in_df.loc[lambda df: (df['Age As Of Today'] >= 60) & (df['Household Survey Type'] == 'Interview') & (df['CITYNAME'] == city), :].shape[0]
    observation = 0

    return {"category": "Subpopulations", "city": cityTitle, "interview": interview ,"observation": observation,"district": district, "subpopulation": 'Seniors 60+',"total": interview + observation}


for district in range(0,5):

    for city in allCities[district]:
        cityTitle =  city

        if city == "RIVERSIDE": cityTitle += ' ' + str(district + 1)
        # elif city == 'UNINCORPORATED DISTRICT 1': cityTitle = 'UNINCORPORATED' + ' ' + str(district + 1)

        for i in range(len(raceSubpopulation)):
            data.append({
            "fields":  get_race_count(allDistricts[district], raceCategory[i],city,cityTitle,district + 1,raceSubpopulation[i])
            })

        for i in range(len(ethnicitySubpopulation)):
            data.append({
            "fields":  get_ethnicity_count(allDistricts[district], ethnicityCategory[i],city,cityTitle,district + 1,ethnicitySubpopulation[i])
            })

        for i in range(len(genderSubpopulation)):
            data.append({
            "fields":  get_gender_count(allDistricts[district], genderCategory[i],city,cityTitle,district + 1,genderSubpopulation[i])
            })
            
        
        for i in range(len(ageSubpopulation)):
            data.append({
            "fields":  get_age_count(allDistricts[district], ageCategory[i],city,cityTitle,district + 1,ageSubpopulation[i])
            })
            

        for i in range(len(substanceAbuseSubpopulation)):
            data.append({
            "fields":  get_Total_SubstanceAbuse(allDistricts[district], subpopulationCategory[i],city,cityTitle,district + 1,substanceAbuseSubpopulation[i])
            })
            

        for i in range(len(ptsdSubpopulation)):
            data.append({
            "fields":  get_Total_PTSD(allDistricts[district], subpopulationCategory[i],city,cityTitle,district + 1,ptsdSubpopulation[i])
            })
            

        for i in range(len(mentalHealthSubpopulation)):
            data.append({
            "fields":  get_Total_MentalHealthCondition(allDistricts[district], subpopulationCategory[i],city,cityTitle,district + 1,mentalHealthSubpopulation[i])
            })
            
        
        for i in range(len(physicalDisabilitySubpopulation)):
            data.append({
            "fields":  get_Total_PhysicalDisability(allDistricts[district], subpopulationCategory[i],city,cityTitle,district + 1,physicalDisabilitySubpopulation[i])
            })
            

        for i in range(len(developmentDisabilitySubpopulation)):
            data.append({
            "fields":  get_Total_DevelopmentDisability(allDistricts[district], subpopulationCategory[i],city,cityTitle,district + 1,developmentDisabilitySubpopulation[i])
            })
            

        for i in range(len(brainInjurySubpopulation)):
            data.append({
            "fields":  get_Total_BrainInjury(allDistricts[district],subpopulationCategory[i],city,cityTitle,district + 1,brainInjurySubpopulation[i])
            })
            

        for i in range(len(domesticViolenceSubpopulation)):
            data.append({
            "fields":  get_Total_DomesticViolence(allDistricts[district], subpopulationCategory[i],city,cityTitle,district + 1,domesticViolenceSubpopulation[i])
            })
            
        
        for i in range(len(aidsOrhivSubpopulation)):
            data.append({
            "fields":  get_Total_AidsOrHiv(allDistricts[district], subpopulationCategory[i],city,cityTitle,district + 1,aidsOrhivSubpopulation[i])
            })
            

        for i in range(len(veteransSubpopulation)):
            data.append({
            "fields":  get_Total_Veterans(allDistricts[district],subpopulationCategory[i],city,cityTitle,district + 1,veteransSubpopulation[i])
            })
            

        for i in range(len(jail90DaysSubpopulation)):
            data.append({
            "fields":  get_Total_Jail90Days(allDistricts[district], jailYesCategory[i],city,cityTitle,district + 1,jail90DaysSubpopulation[i])
            })
            
        
        for i in range(len(jail12MonthsSubpopulation)):
            data.append({
            "fields":  get_Total_Jail12Months(allDistricts[district], jailYesCategory[i],city,cityTitle,district + 1,jail12MonthsSubpopulation[i])
            })
            
        
        for i in range(len(jailNoSubpopulation)):
            data.append({
            "fields":  get_Total_NonJailCount(allDistricts[district], jailCategory[i],city,cityTitle,district + 1,jailNoSubpopulation[i])
            })
            

        data.append({
        "fields":  get_Total_ChronicHomeless(allDistricts[district],city,cityTitle,district + 1)
        })
        

        data.append({
        "fields":  get_Total_NotChronicHomeless(allDistricts[district],city,cityTitle,district + 1)
        })
        


        data.append({
        "fields":  get_Total_Households_OnlyAdults(allDistricts[district],city,cityTitle,district + 1)
        })
    
        data.append({
        
        "fields":  get_Total_Households_OnlyChildren(allDistricts[district],city,cityTitle,district + 1)
        })

        data.append({
        
        "fields":  get_Total_Households_AdultsandChildren(allDistricts[district],city,cityTitle,district + 1)
        })

        data.append({
        
        "fields":  get_Total_PetOwner(allDistricts[district],city,cityTitle,district + 1)
        })

        data.append({
        "fields":  get_Total_Individuals(allDistricts[district],city,cityTitle,district + 1)
        })

        data.append({
        "fields":  get_NewlyHomeless(allDistricts[district],city,cityTitle,district + 1)
        })

        data.append({
        "fields":  get_Seniors(allDistricts[district],city,cityTitle,district + 1)
        })



for districtData in [df_d1_2]:
    for city in ["RIVERSIDE"]:
        cityTitle =  city

        for i in range(len(raceSubpopulation)):
            data.append({
            "fields":  get_race_count(districtData, raceCategory[i],city,cityTitle,"1+2",raceSubpopulation[i])
            })

        for i in range(len(ethnicitySubpopulation)):
            data.append({
            "fields":  get_ethnicity_count(districtData, ethnicityCategory[i],city,cityTitle,"1+2",ethnicitySubpopulation[i])
            })

        for i in range(len(genderSubpopulation)):
            data.append({
            "fields":  get_gender_count(districtData, genderCategory[i],city,cityTitle,"1+2",genderSubpopulation[i])
            })
            
        
        for i in range(len(ageSubpopulation)):
            data.append({
            "fields":  get_age_count(districtData, ageCategory[i],city,cityTitle,"1+2",ageSubpopulation[i])
            })
            

        for i in range(len(substanceAbuseSubpopulation)):
            data.append({
            "fields":  get_Total_SubstanceAbuse(districtData, subpopulationCategory[i],city,cityTitle,"1+2",substanceAbuseSubpopulation[i])
            })
            

        for i in range(len(ptsdSubpopulation)):
            data.append({
            "fields":  get_Total_PTSD(districtData, subpopulationCategory[i],city,cityTitle,"1+2",ptsdSubpopulation[i])
            })
            

        for i in range(len(mentalHealthSubpopulation)):
            data.append({
            "fields":  get_Total_MentalHealthCondition(districtData, subpopulationCategory[i],city,cityTitle,"1+2",mentalHealthSubpopulation[i])
            })
            
        
        for i in range(len(physicalDisabilitySubpopulation)):
            data.append({
            "fields":  get_Total_PhysicalDisability(districtData, subpopulationCategory[i],city,cityTitle,"1+2",physicalDisabilitySubpopulation[i])
            })
            

        for i in range(len(developmentDisabilitySubpopulation)):
            data.append({
            "fields":  get_Total_DevelopmentDisability(districtData, subpopulationCategory[i],city,cityTitle,"1+2",developmentDisabilitySubpopulation[i])
            })
            

        for i in range(len(brainInjurySubpopulation)):
            data.append({
            "fields":  get_Total_BrainInjury(districtData,subpopulationCategory[i],city,cityTitle,"1+2",brainInjurySubpopulation[i])
            })
            

        for i in range(len(domesticViolenceSubpopulation)):
            data.append({
            "fields":  get_Total_DomesticViolence(districtData, subpopulationCategory[i],city,cityTitle,"1+2",domesticViolenceSubpopulation[i])
            })
            
        
        for i in range(len(aidsOrhivSubpopulation)):
            data.append({
            "fields":  get_Total_AidsOrHiv(districtData, subpopulationCategory[i],city,cityTitle,"1+2",aidsOrhivSubpopulation[i])
            })
            

        for i in range(len(veteransSubpopulation)):
            data.append({
            "fields":  get_Total_Veterans(districtData,subpopulationCategory[i],city,cityTitle,"1+2",veteransSubpopulation[i])
            })
            

        for i in range(len(jail90DaysSubpopulation)):
            data.append({
            "fields":  get_Total_Jail90Days(districtData, jailYesCategory[i],city,cityTitle,"1+2",jail90DaysSubpopulation[i])
            })
            
        
        for i in range(len(jail12MonthsSubpopulation)):
            data.append({
            "fields":  get_Total_Jail12Months(districtData, jailYesCategory[i],city,cityTitle,"1+2",jail12MonthsSubpopulation[i])
            })
            
        
        for i in range(len(jailNoSubpopulation)):
            data.append({
            "fields":  get_Total_NonJailCount(districtData, jailCategory[i],city,cityTitle,"1+2",jailNoSubpopulation[i])
            })
            

        data.append({
        "fields":  get_Total_ChronicHomeless(districtData,city,cityTitle,"1+2")
        })
        

        data.append({
        "fields":  get_Total_NotChronicHomeless(districtData,city,cityTitle,"1+2")
        })
        


        data.append({
        "fields":  get_Total_Households_OnlyAdults(districtData,city,cityTitle,"1+2")
        })
    
        data.append({
        
        "fields":  get_Total_Households_OnlyChildren(districtData,city,cityTitle,"1+2")
        })

        data.append({
        
        "fields":  get_Total_Households_AdultsandChildren(districtData,city,cityTitle,"1+2")
        })

        data.append({
        
        "fields":  get_Total_PetOwner(districtData,city,cityTitle,"1+2")
        })

        data.append({
        "fields":  get_Total_Individuals(districtData,city,cityTitle,"1+2")
        })

        data.append({
        "fields":  get_NewlyHomeless(districtData,city,cityTitle,"1+2")
        })

        data.append({
        "fields":  get_Seniors(districtData,city,cityTitle,"1+2")
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
        d['fields']['_type'] = 'Unsheltered'
        d['fields']['year'] = int(year)
        jsonData.append(d)




out = open('./JSON/2020/SubpopulationsByCity.json','w')

out.write (json.dumps(jsonData, cls=NpEncoder, indent=4))
out.close()


