'''

This File Contains all the functions to create the table for 'final counts for district in a particular year'
This file also contains the functions to create the table for 'final count for year trend in a particular year'
This file contains a function to calculate for each attribute  

'''

import pandas as pd

df = pd.read_csv('../../../HouseholdQuestions_Cities_Districts_040119_1300.csv')

df_d1 = df.loc[lambda df: df['DISTRICT'] == 1, :]
df_d2 = df.loc[lambda df: df['DISTRICT'] == 2, :]
df_d3 = df.loc[lambda df: df['DISTRICT'] == 3, :]
df_d4 = df.loc[lambda df: df['DISTRICT'] == 4, :]
df_d5 = df.loc[lambda df: df['DISTRICT'] == 5, :]

def get_age_count(in_df, value):
    # in_df = df.loc[lambda df: df['DISTRICT'] == district, :]
    if value == 'child':
        result = in_df.loc[lambda df: (df['Age As Of Today'] < 18) | (df['Age Observed'] == 'Under18'), :].shape[0]
        return result
    elif value == 'youth':
        result = in_df.loc[lambda df: ((df['Age As Of Today'] < 25) & (df['Age As Of Today'] >= 18)) | (df['Age Observed'] == 'Under24'), :].shape[0]
        return result           
    elif value == 'adult':
        result = in_df.loc[lambda df: (df['Age As Of Today'] >=25) | (df['Age Observed'] == 'Over25'), :].shape[0]
        return result
    elif value == 'unknown':
        result = in_df.loc[lambda df: df['Age Observed'] == 'NotSure', :].shape[0]
        return result

def get_YouthCount(in_df,value):
    result = in_df.loc[lambda df: (((df['Age As Of Today'] < 25) & (df['Age As Of Today'] >= 18)) | (df['Age Observed'] == 'Under24')) & (df['Household Survey Type'] == value), :].shape[0]
    return result 

def get_ethnicity_count(in_df, value):
    # in_df = df.loc[lambda df: df['DISTRICT'] == district, :]
    result = in_df.loc[lambda df: (df['Hispanic Observed'] == value[0]) | (df['Ethnicity'] == value[1]), :].shape[0] 
    return result

def get_race_count(in_df, value):
    # in_df = df.loc[lambda df: df['DISTRICT'] == district, :]
    result = in_df.loc[lambda df: (df['Race Observed'] == value[0]) | (df['Race'] == value[1]), :].shape[0] 
    return result

def get_gender_count(in_df, value):
    # in_df = df.loc[lambda df: df['DISTRICT'] == district, :]
    result = in_df.loc[lambda df: (df['Gender'] == value) | (df['Gender Observed'] == value), :].shape[0] 
    return result

def get_district_count(in_df, value):
    result = in_df.loc[lambda df: (df['Household Survey Type'] == value[0]) | (df['Household Survey Type'] == value[1]), :].shape[0] 
    return result

def get_Total_Living_Situation(in_df, value):
    result = in_df.loc[lambda df: (df['P_Living Situation'] == value) & (df['Household Survey Type'] == "Interview"), :].shape[0] 
    return result

def repeats(in_df):
    return (any(df['GlobalID'].duplicated()))

def get_Total_Elderly(in_df):
    result = in_df.loc[lambda df: (df['Age As Of Today'] >=62) & (df['Household Survey Type'] == 'Interview'), :].shape[0]
    return result

def get_Total_Chronic(in_df):
    result = in_df.loc[lambda df: (df['Chronically Homeless Status'] == 0 ) & (df['Household Survey Type'] == 'Interview'), :].shape[0]
    return result

def get_TotalVIHMP(in_df,column):
    if column == "Jail Or Prison":
        result = in_df.loc[lambda df: (df[column] == "Yes") | (df[column] == "YesTwelveMonths") | (df[column] == "YesNinetyDays"), :].shape[0]
        return result
    else:
        result = in_df.loc[lambda df: (df[column] == "Yes"), :].shape[0] 
        return result

## ? Recheck the function get_Total_Interview_With CHild and get_total_WithChild
#! I got my result base on creating a household with Adult and Children , While the counts on the dashboard are based on how many child are marked in the csv 
def get_Total_Interview_withChild(in_df):
    total_adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')
    
    intersected_df = pd.merge(total_adults, total_children, how='inner').drop_duplicates(subset='ParentGlobalID')

    return intersected_df.shape[0]

def get_Total_withChild(in_df):
    result = in_df.loc[lambda df:((df['Age Observed'] == "Under18") & (df['P_Number of Adults'] == 1)) | ((df['Relationship To HoH'] == "Child") & (df['Age As Of Today'] < 18)) , ['ParentGlobalID']]
    return len(result.drop_duplicates())

def get_Total_DistrictCount(in_df):
    result = in_df.loc[lambda df: (df['Household Survey Type'] == 'Interview') | (df['Household Survey Type'] == 'Observation'), :].shape[0] 
    return result

def get_Total_Count(in_df):
    result = in_df.shape[0]
    return result

def get_Total_InterviewCount(in_df):
    result = in_df.loc[lambda df: df['Household Survey Type'] == 'Interview', :].shape[0]
    return result

def get_Total_ObserveCount(in_df):
    result = in_df.loc[lambda df: df['Household Survey Type'] == 'Observation', :].shape[0]
    return result

def get_Total_Veterans(in_df):
    result = in_df.loc[lambda df: df['Veteran'] == 1, :].shape[0]
    return result


#! Working on functions

def get_Total_Households(in_df):
    result = in_df['ParentGlobalID'].drop_duplicates().shape[0]
    return result

def get_Total_Households_AdultsandChildren(in_df):
    total_adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
        #    | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18'))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')
    
    intersected_df = pd.merge(total_adults, total_children, how='inner').drop_duplicates(subset='ParentGlobalID')

    return intersected_df.shape[0]

def get_Total_Households_OnlyChildren(in_df):
    total_children = in_df.loc[lambda df:\
    ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
        # | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18'))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')

    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    #set_diff_df = pd.concat([total_Adults, total_children, total_children]).drop_duplicates(keep=False)
    set_diff_df = total_children.merge(total_Adults, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df.shape[0]

def get_Total_Households_OnlyAdults(in_df):
    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
        #    | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | ((df['Age Observed'] == 'NotSure'))))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')


    #set_diff_df = pd.concat([total_Adults, total_children, total_children]).drop_duplicates(keep=False)
    set_diff_df = total_Adults.merge(total_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df.shape[0]

def get_Total_Households_Interview(in_df):
    result = in_df.loc[lambda df: df['Household Survey Type'] == 'Interview', ['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID').shape[0]
    return result


## ? Check with kevin the results for this one 
# ! I believe my number are corrects. The number in the dashboard are just based on the people who are marked as chronically homeless, but it does not consider 
# ! It does not consider people in the same household who should be marked as chronically homeless. My code counts does who are marked as chronically homeless
#! and people who should have been marked as chronically homeless based on the household status. This will affect count for chronically homeless individuals

def get_Total_ChronicHomeless(in_df):

    ChronicallyHomelessHouseholds = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']].drop_duplicates(subset='ParentGlobalID')

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview'))\
            | ((df['Household Survey Type'] == 'Observation'))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(ChronicallyHomelessHouseholds['ParentGlobalID']).sum()
    
    return total_persons

def get_Total_NotChronicHomeless(in_df):
    return  get_district_count(in_df,['Interview','Observation']) - get_Total_ChronicHomeless(in_df)

#! Working on Function ended 


'''
This Function works for:
Total: ethnicity_count, race_count , Total District Count 
'''
def getTotal_Ethnicity_Race_District(in_df,column, value):
    # in_df = df.loc[lambda df: df['DISTRICT'] == district, :]
    if len(column) == 1:
        result = in_df.loc[lambda df: (df[column[0]] == value[0]) | (df[column[0]] == value[1]), :].shape[0] 
        return result
    elif len(column) == 2:
        result = in_df.loc[lambda df: (df[column[0]] == value[0]) | (df[column[1]] == value[1]), :].shape[0] 
        return result

'''
This function works for:
Total: Interview, Observed, Total count
Total: Gender Count, PTSD
'''
def getTotal_Interview_Observed_Row_Gender_PTSD(in_df,column=None, value=None):
    # in_df = df.loc[lambda df: df['DISTRICT'] == district, :]
    if column == None:
        result = in_df.shape[0]
        return result
    elif len(column) == 1:
        result = in_df.loc[lambda df: df[column[0]] == value, :].shape[0]
        return result
    elif len(column) == 2: 
        result = in_df.loc[lambda df: (df[column[0]] == value) | (df[column[1]] == value), :].shape[0] 
        return result


'''
This Function works for:
Total: ethnicity_count, race_count , Total District Count 
Total: Interview, Observed, Total count
Total: Gender Count, PTSD
'''
def get_TotalOptimize(in_df,column=None, value=None):
    # in_df = df.loc[lambda df: df['DISTRICT'] == district, :]
    if column == None:
        result = in_df.shape[0]
        return result
    elif len(column) == 1 and len(value) == 1:
        result = in_df.loc[lambda df: df[column[0]] == value[0], :].shape[0]
        return result
    elif len(column) == 1 and len(value) == 2:
        result = in_df.loc[lambda df: (df[column[0]] == value[0]) | (df[column[0]] == value[1]), :].shape[0] 
        return result
    elif len(column) == 2 and len(value) == 1: 
        result = in_df.loc[lambda df: (df[column[0]] == value[0]) | (df[column[1]] == value[0]), :].shape[0] 
        return result
    elif len(column) == 2 and len(value) == 2: 
        result = in_df.loc[lambda df: (df[column[0]] == value[0]) | (df[column[1]] == value[1]), :].shape[0] 
        return result

def District_table()->"dataframe":
    ## OPTIMIZE:
    new_df = {'District':[1,2,3,4,5],
              'Total Count': table_totalCountDistrict,
              'Interview': table_totalInterviewDistrict,
              'Observational': table_totalObservedDistrict,
              'Adult(>25)': table_Adult,
              'Youth(18-24)': table_Youth,
              'Children(<17)': table_Children,
              'Male': table_Male,
              'Female': table_Female,
              'Transgender': table_Transgender,
              'Gender Non Conforming': table_NonConforming,
              'Unknown Gender': table_UnknownGender,
              'Veterans':table_Veterans,
              'Year':[2019,2019,2019,2019,2019],
              'Household':table_totalHouseHolds,
              'Adults and Children (Interview)':table_totalHouseHoldsAdultandChildren,
              'Only Children (Interview)':table_totalHouseHoldsOnlyChildren,
              'Only Adults (Interview)':table_totalHouseHoldsOnlyAdults,
              'Households (Interviewed)':table_totalHouseHoldsInterview,
              'Chronic': table_totalChronicHomeless,
              'Not Chronic':table_totalnotChronicHomeless,
              'Asian': table_Asian,
              'American Indian': table_AmericanIndian,
              'Black': table_Black,
              'White': table_White,
              'Multiple': table_MultipleRace,
              'Native Hawaiin': table_NativeHawaiin,
              'Unknown Race': table_UnknownRace
              }
    df = pd.DataFrame(new_df)

    return df

def createTable_YearFinalCount(currentYear):
    yearCol = ['Sheltered','Unsheltered','Volunteers','District 1','District 2','District 3','District 4','District 5','Veterans','Youth(18-24)-Total','Youth(18-24)- Interviewed','Youth(18-24)- Observed','Chronically Homeless','Families w/ Children','Elderly(>=62)','Victims of Domestic Violence','Incarceration','SA-Alchohol Abuse','SA- Drug Abuse','SA- Either/Or','HIV/Aids','Mental Health','PTSD','Brain Injury]']
    data = table_YearFinalCount
    df= pd.DataFrame({
        'Year': yearCol,
        currentYear: data
    })
    return df
'''
START
Table Inputs for District Table

# '''

#! Not Sure if this values are correct for totalHouseHolds both interview and observer 
table_totalHouseHolds = [
    get_Total_Households(df_d1),
    get_Total_Households(df_d2),
    get_Total_Households(df_d3),
    get_Total_Households(df_d4),
    get_Total_Households(df_d5)
]


table_totalHouseHoldsAdultandChildren = [
    get_Total_Households_AdultsandChildren(df_d1),
    get_Total_Households_AdultsandChildren(df_d2),
    get_Total_Households_AdultsandChildren(df_d3),
    get_Total_Households_AdultsandChildren(df_d4),
    get_Total_Households_AdultsandChildren(df_d5)
]

table_totalHouseHoldsOnlyChildren = [
    get_Total_Households_OnlyChildren(df_d1),
    get_Total_Households_OnlyChildren(df_d2),
    get_Total_Households_OnlyChildren(df_d3),
    get_Total_Households_OnlyChildren(df_d4),
    get_Total_Households_OnlyChildren(df_d5)
]

table_totalHouseHoldsOnlyAdults = [
    get_Total_Households_OnlyAdults(df_d1),
    get_Total_Households_OnlyAdults(df_d2),
    get_Total_Households_OnlyAdults(df_d3),
    get_Total_Households_OnlyAdults(df_d4),
    get_Total_Households_OnlyAdults(df_d5)
]

table_totalHouseHoldsInterview = [
    get_Total_Households_Interview(df_d1),
    get_Total_Households_Interview(df_d2),
    get_Total_Households_Interview(df_d3),
    get_Total_Households_Interview(df_d4),
    get_Total_Households_Interview(df_d5)
]

table_totalChronicHomeless = [
    get_Total_ChronicHomeless(df_d1),
    get_Total_ChronicHomeless(df_d2),
    get_Total_ChronicHomeless(df_d3),
    get_Total_ChronicHomeless(df_d4),
    get_Total_ChronicHomeless(df_d5)
]

table_totalnotChronicHomeless = [
    get_Total_NotChronicHomeless(df_d1),
    get_Total_NotChronicHomeless(df_d2),
    get_Total_NotChronicHomeless(df_d3),
    get_Total_NotChronicHomeless(df_d4),
    get_Total_NotChronicHomeless(df_d5)
]

table_totalCountDistrict = [
    get_district_count(df_d1,['Interview','Observation']),
    get_district_count(df_d2,['Interview','Observation']),
    get_district_count(df_d3,['Interview','Observation']),
    get_district_count(df_d4,['Interview','Observation']),
    get_district_count(df_d5,['Interview','Observation']),
]

table_totalInterviewDistrict = [
    get_Total_InterviewCount(df_d1),
    get_Total_InterviewCount(df_d2),
    get_Total_InterviewCount(df_d3),
    get_Total_InterviewCount(df_d4),
    get_Total_InterviewCount(df_d5)
]

table_totalObservedDistrict = [
    get_Total_ObserveCount(df_d1),
    get_Total_ObserveCount(df_d2),
    get_Total_ObserveCount(df_d3),
    get_Total_ObserveCount(df_d4),
    get_Total_ObserveCount(df_d5)
]

table_Adult = [
    get_age_count(df_d1, 'adult'), 
    get_age_count(df_d2, 'adult'),
    get_age_count(df_d3, 'adult'),
    get_age_count(df_d4, 'adult'),
    get_age_count(df_d5, 'adult')  
]

table_Youth = [
    get_age_count(df_d1, 'youth'), 
    get_age_count(df_d2, 'youth'),
    get_age_count(df_d3, 'youth'),
    get_age_count(df_d4, 'youth'),
    get_age_count(df_d5, 'youth') 
]

table_Children =[
    get_age_count(df_d1, 'child'), 
    get_age_count(df_d2, 'child'),
    get_age_count(df_d3, 'child'),
    get_age_count(df_d4, 'child'),
    get_age_count(df_d5, 'child') 
]

table_Male =[
    get_gender_count(df_d1,'Male'), 
    get_gender_count(df_d2,'Male'), 
    get_gender_count(df_d3,'Male'), 
    get_gender_count(df_d4,'Male'),
    get_gender_count(df_d4,'Male')
]

table_Female=[
    get_gender_count(df_d1,'Female'),
    get_gender_count(df_d2,'Female'),
    get_gender_count(df_d3,'Female'),
    get_gender_count(df_d4,'Female'),
    get_gender_count(df_d4,'Female')
]

table_Transgender =[
    get_gender_count(df_d1,'MTF') + get_gender_count(df_d1,'FTM'),
    get_gender_count(df_d2,'MTF') + get_gender_count(df_d2,'FTM'),
    get_gender_count(df_d3,'MTF') + get_gender_count(df_d3,'FTM'),
    get_gender_count(df_d4,'MTF') + get_gender_count(df_d4,'FTM'),
    get_gender_count(df_d5,'MTF') + get_gender_count(df_d5,'FTM')
]

table_NonConforming =[
    get_gender_count(df_d1,'GenderNonConforming'),
    get_gender_count(df_d2,'GenderNonConforming'),
    get_gender_count(df_d3,'GenderNonConforming'),
    get_gender_count(df_d4,'GenderNonConforming'),
    get_gender_count(df_d5,'GenderNonConforming')
]

table_UnknownGender = [
    get_gender_count(df_d1,'DoesntKnow') + get_gender_count(df_d1,'NotSure'),
    get_gender_count(df_d2,'DoesntKnow') + get_gender_count(df_d2,'NotSure'),
    get_gender_count(df_d3,'DoesntKnow') + get_gender_count(df_d3,'NotSure'),
    get_gender_count(df_d4,'DoesntKnow') + get_gender_count(df_d4,'NotSure'),
    get_gender_count(df_d5,'DoesntKnow') + get_gender_count(df_d5,'NotSure')
]

table_Veterans = [
    get_Total_Veterans(df_d1),
    get_Total_Veterans(df_d2),
    get_Total_Veterans(df_d3),
    get_Total_Veterans(df_d4),
    get_Total_Veterans(df_d5),
]

table_Asian = [
    get_race_count(df_d1, ['Asian','Asian']),
    get_race_count(df_d2, ['Asian','Asian']),
    get_race_count(df_d3, ['Asian','Asian']),
    get_race_count(df_d4, ['Asian','Asian']),
    get_race_count(df_d5, ['Asian','Asian']),
]

table_AmericanIndian = [
    get_race_count(df_d1, ['AmericanIndian','AmericanIndian']),
    get_race_count(df_d2, ['AmericanIndian','AmericanIndian']),
    get_race_count(df_d3, ['AmericanIndian','AmericanIndian']),
    get_race_count(df_d4, ['AmericanIndian','AmericanIndian']),
    get_race_count(df_d5, ['AmericanIndian','AmericanIndian'])
]

table_Black = [
    get_race_count(df_d1, ['Black','Black']),
    get_race_count(df_d2, ['Black','Black']),
    get_race_count(df_d3, ['Black','Black']),
    get_race_count(df_d4, ['Black','Black']),
    get_race_count(df_d5, ['Black','Black']),
]

table_White = [
    get_race_count(df_d1, ['White','White']),
    get_race_count(df_d2, ['White','White']),
    get_race_count(df_d3, ['White','White']),
    get_race_count(df_d4, ['White','White']),
    get_race_count(df_d5, ['White','White']),
]

table_MultipleRace = [
    get_race_count(df_d1, ['Multiple','Multiple']),
    get_race_count(df_d2, ['Multiple','Multiple']),
    get_race_count(df_d3, ['Multiple','Multiple']),
    get_race_count(df_d4, ['Multiple','Multiple']),
    get_race_count(df_d5, ['Multiple','Multiple']),
]

table_NativeHawaiin = [
    get_race_count(df_d1, ['NativeHawaiian','NativeHawaiian']),
    get_race_count(df_d2, ['NativeHawaiian','NativeHawaiian']),
    get_race_count(df_d3, ['NativeHawaiian','NativeHawaiian']),
    get_race_count(df_d4, ['NativeHawaiian','NativeHawaiian']),
    get_race_count(df_d5, ['NativeHawaiian','NativeHawaiian']),
]

table_UnknownRace = [
    get_race_count(df_d1, ['NotSure','DoesntKnow']),
    get_race_count(df_d2, ['NotSure','DoesntKnow']),
    get_race_count(df_d3, ['NotSure','DoesntKnow']),
    get_race_count(df_d4, ['NotSure','DoesntKnow']),
    get_race_count(df_d5, ['NotSure','DoesntKnow']),
]
'''
Table Inputs for District Table
END
'''


'''
START 
Table Inputs for Year Final Count
'''
DistrictTotal = ['Household Survey Type']
table_YearFinalCount = [
    'Sheltered',
    get_Total_Count(df),
    'Volunteers',
    get_Total_DistrictCount(df_d1),
    get_Total_DistrictCount(df_d2),
    get_Total_DistrictCount(df_d3),
    get_Total_DistrictCount(df_d4),
    get_Total_DistrictCount(df_d5),
    get_Total_Veterans(df),
    get_age_count(df, 'youth'),
    get_YouthCount(df, 'Interview'),
    get_YouthCount(df, 'Observation'),
    get_Total_ChronicHomeless(df),
    get_Total_Interview_withChild(df),
    get_Total_Elderly(df),
    get_TotalVIHMP(df,'Domestic Violence Victim'),
    get_TotalVIHMP(df,'Jail Or Prison'),
    None,
    None, 
    get_TotalVIHMP(df,'Substance Abuse'),
    get_TotalVIHMP(df,'HIV/AIDS'),
    get_TotalVIHMP(df,'Mental Health Issue'),
    get_TotalVIHMP(df,'PTSD'),
    get_TotalVIHMP(df,'Brain Injury')
]
'''
Table Inputs for Year Final Count
END
'''



'''
START
Create District Table
'''
print('------District Table--------')
print('\n')
District_Table = District_table()
print(District_Table.to_string())
print('\n')

print('------Year Table--------')
Year_Table = createTable_YearFinalCount('2019')
# df_2019 = Year_Table.loc[lambda Year_Table: Year_Table['2019'], :]
print(Year_Table.to_string())
print("\n")

'''
Create District Table
END
'''
