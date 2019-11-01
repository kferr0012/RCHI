
import pandas as pd
in_df = pd.read_csv('../../../HouseholdQuestions_Cities_Districts_040119_1300.csv')

##* Helper Function that returns total number of households
def helperFunction_Total_num_Households():

    total_ParentingYouth = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <=24))\
           | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | (df['Age Observed'] == 'Under24') ))\
               ,['ParentGlobalID']]['ParentGlobalID']\
                   .value_counts()


    total_ParentingYouth = total_ParentingYouth[total_ParentingYouth >= 2].to_frame().drop(columns= ['ParentGlobalID']).reset_index().rename(columns={"index": "ParentGlobalID"}).drop_duplicates(subset='ParentGlobalID')

    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] > 24))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Over25'))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    set_diff_df = total_ParentingYouth.merge(total_Adults, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    total_children = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18'))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')
    
    intersected_df = pd.merge(set_diff_df, total_children, how='inner').drop_duplicates(subset='ParentGlobalID')

    return intersected_df

##* Total number of households
def total_number_of_households(): 

    households_list = helperFunction_Total_num_Households()

    return households_list

##* Total number of persons
def total_number_of_persons():
    households_list =  helperFunction_Total_num_Households()

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24))\
            | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | (df['Age Observed'] == 'Under24')))
                , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()

    # total_persons = in_df['ParentGlobalID'].isin(households_list['ParentGlobalID']).sum()
    
    return total_persons

##* Total number of Youth Parents
def total_number_of_youthParents():
    households_list =  helperFunction_Total_num_Households().shape[0]
    
    return households_list

##*  Total Number of Children (Under 18)
def total_number_of_children():
    
    households_list = helperFunction_Total_num_Households()

    total_number_of_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_of_children

#* Total number of parenting youth under 18
def total_number_parenting_under18():
    households_list = helperFunction_Total_num_Households()

    total_non_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & ((df['Age As Of Today'] >= 18) & (df['Age As Of Today'] <= 24)))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under24'))\
               ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')

    set_diff_df = households_list.merge(total_non_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df.shape[0]

#* Children in households with parenting youth under age 18
def total_number_children_in_under18_Household():
    households_list = helperFunction_Total_num_Households()

    total_non_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & ((df['Age As Of Today'] >= 18) & (df['Age As Of Today'] <= 24)))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under24'))\
               ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')

    set_diff_df = households_list.merge(total_non_children, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    total_number_of_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(set_diff_df['ParentGlobalID']).sum()

    return total_number_of_children

#* Total number of parenting youth 18 - 24
def total_number_parenting_18to24():
    households_list = helperFunction_Total_num_Households()

    total_18_to_24 = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & ((df['Age As Of Today'] >=18) & (df['Age As Of Today'] <= 24)))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under24'))\
               ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')

    intersected_df = pd.merge(households_list, total_18_to_24, how='inner').drop_duplicates(subset='ParentGlobalID')

    return intersected_df.shape[0]

#* Children in households with parenting youth 18 to 24
def total_number_children_in_18to24_Household():
    households_list = helperFunction_Total_num_Households()

    total_18_to_24 = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & ((df['Age As Of Today'] >=18) & (df['Age As Of Today'] <= 24)))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under24'))\
               ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')

    intersected_df = pd.merge(households_list, total_18_to_24, how='inner').drop_duplicates(subset='ParentGlobalID')

    total_number_of_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(intersected_df['ParentGlobalID']).sum()

    return total_number_of_children

##* Total number of Female (Adult & Children)
def total_number_of_female():
    households_list =  helperFunction_Total_num_Households()

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24))\
            | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | (df['Age Observed'] == 'Under24')))
                , ['ParentGlobalID','Age As Of Today', 'Gender', 'Age Observed', 'Gender Observed']]

    total_person_household = total_persons[total_persons['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID'])]

    Interview_Results = total_person_household.groupby(['ParentGlobalID'],as_index=False).agg({'Age As Of Today':'max' ,'Gender': 'last'}).dropna()
    Interview_Results = Interview_Results[Interview_Results['Gender'] == 'Female'].shape[0]
    Observe_Results = total_person_household.groupby(['ParentGlobalID'],as_index=False).agg({'Age Observed':'max' ,'Gender Observed': 'last'}).dropna()
    Observe_Results = Observe_Results[Observe_Results['Gender Observed'] == 'Female'].shape[0]


    


    return Interview_Results + Observe_Results

##* Total number of Male (Adult & Children)
def total_number_of_male():
    households_list =  helperFunction_Total_num_Households()

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24))\
            | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | (df['Age Observed'] == 'Under24')))
                , ['ParentGlobalID','Age As Of Today', 'Gender', 'Age Observed', 'Gender Observed']]

    total_person_household = total_persons[total_persons['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID'])]

    Interview_Results = total_person_household.groupby(['ParentGlobalID'],as_index=False).agg({'Age As Of Today':'max' ,'Gender': 'last'}).dropna()
    Interview_Results = Interview_Results[Interview_Results['Gender'] == 'Male'].shape[0]
    Observe_Results = total_person_household.groupby(['ParentGlobalID'],as_index=False).agg({'Age Observed':'max' ,'Gender Observed': 'last'}).dropna()
    Observe_Results = Observe_Results[Observe_Results['Gender Observed'] == 'Male'].shape[0]

    return Interview_Results + Observe_Results

##* Total number of Transgender (Adult & Children)
def total_number_of_transgender():



    households_list =  helperFunction_Total_num_Households()

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24))\
            | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | (df['Age Observed'] == 'Under24')))
                , ['ParentGlobalID','Age As Of Today', 'Gender', 'Age Observed', 'Gender Observed']]

    total_person_household = total_persons[total_persons['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID'])] 

    Interview_Results = total_person_household.groupby(['ParentGlobalID'],as_index=False).agg({'Age As Of Today':'max' ,'Gender': 'last'}).dropna()
    gender = ['MTF', 'FTM']
    Interview_Results = Interview_Results['Gender'].isin(gender).sum()


    return Interview_Results

##* Total number of Gender Non-Conforming (Adult & Children)
def total_number_of_gender_non_conforming():

    households_list =  helperFunction_Total_num_Households()

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24))\
            | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | (df['Age Observed'] == 'Under24')))
                , ['ParentGlobalID','Age As Of Today', 'Gender', 'Age Observed', 'Gender Observed']]

    total_person_household = total_persons[total_persons['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID'])]

    Interview_Results = total_person_household.groupby(['ParentGlobalID'],as_index=False).agg({'Age As Of Today':'max' ,'Gender': 'last'}).dropna()
    Interview_Results = Interview_Results[Interview_Results['Gender'] == 'GenderNonConforming'].shape[0]

    return Interview_Results 

##* Total number of Gender Known (Adult & Children)
def total_number_of_gender_known():
    households_list =  helperFunction_Total_num_Households()

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24))\
            | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | (df['Age Observed'] == 'Under24')))
                , ['ParentGlobalID','Age As Of Today', 'Gender', 'Age Observed', 'Gender Observed']]

    total_person_household = total_persons[total_persons['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID'])]

    Interview_Results = total_person_household.groupby(['ParentGlobalID'],as_index=False).agg({'Age As Of Today':'max' ,'Gender': 'last'}).dropna().shape[0]
    Observe_Results = total_person_household.groupby(['ParentGlobalID'],as_index=False).agg({'Age Observed':'max' ,'Gender Observed': 'last'}).dropna().shape[0]

    return Interview_Results + Observe_Results

##* Total number of non latinos/hispanics
def total_number_of_ethnicity_nonlatino():
    households_list =  helperFunction_Total_num_Households()

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24))\
            | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Under18') | (df['Age Observed'] == 'Under24')))
                , ['ParentGlobalID','Age As Of Today', 'Ethnicity', 'Age Observed', 'Hispanic Observed']]

    total_person_household = total_persons[total_persons['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID'])]
    print("Before query ", total_person_household)

    Interview_Results = total_person_household.groupby(['ParentGlobalID'],as_index=False).agg({'Age As Of Today':'max' ,'Ethnicity': 'last'}).dropna()
    Interview_Results = Interview_Results[Interview_Results['Ethnicity'] == 'No'].shape[0]
    Observe_Results = total_person_household.groupby(['ParentGlobalID'],as_index=False).agg({'Age Observed':'max' ,'Hispanic Observed': 'last'}).dropna()
    Observe_Results = Observe_Results[Observe_Results['Hispanic Observed'] == 'NonHispanic']

    print("After query : ", Observe_Results)
    # return Interview_Results + Observe_Results

##* Total number of latinos/hispanics
def total_number_of_ethnicity_latino():
    households_list =  helperFunction_Total_num_Households()

    total_number_LatHisp = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Ethnicity'] == 'Yes'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Hispanic Observed'] == 'Hispanic'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_LatHisp

##* Total number of Ethnicity Known
def total_number_of_ethnicity_Known():
    households_list =  helperFunction_Total_num_Households()

    total_EthnicityKnown = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') &(df['Ethnicity'] != 'DoesntKnow'))\
             | ((df['Household Survey Type'] == 'Observation') & (df['Hispanic Observed'] != 'NotSure'))\
                 , ['ParentGlobalID']]['ParentGlobalID']\
                        .isin(households_list['ParentGlobalID']).sum()
    
    return total_EthnicityKnown

##* Total number of White
def total_number_of_race_white():
    households_list =  helperFunction_Total_num_Households()

    total_number_white = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'White'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'White'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_white

##* Total number of African 
def total_number_of_race_African():
    households_list =  helperFunction_Total_num_Households()

    total_number_black = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Black'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'Black'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_black

##* Total number of Asian 
def total_number_of_race_Asian():
    households_list =  helperFunction_Total_num_Households()

    total_number_asian = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Asian'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'Asian'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_asian

##* Total number American Indian
def total_number_of_race_AmericanIndian():
    households_list =  helperFunction_Total_num_Households()

    total_number_AmericanIndian = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'AmericanIndian'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'AmericanIndian'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_AmericanIndian

##* Total number Native Hawaiian or Other Pacific Islander
def total_number_of_race_NativeHawiian():
    households_list =  helperFunction_Total_num_Households()

    total_number_NativeHawaiian = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'NativeHawaiian'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'NativeHawaiian'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_NativeHawaiian

##* Total number Multiple Race
def total_number_of_race_Multiple():
    households_list =  helperFunction_Total_num_Households()

    total_number_multiple = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Multiple'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] == 'Multiple'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_multiple

##* Total number Race Known
def total_number_of_race_known():
    households_list =  helperFunction_Total_num_Households()

    total_number_of_race_known = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Race'] != 'DoesntKnow'))\
            | ((df['Household Survey Type'] == 'Observation') & (df['Race Observed'] != 'NotSure'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_of_race_known

print("---------Unit Testing ---------")
print('\n')
print("Parenting Youth Households" )

print('\n')
print('--------Total number of parenting youth households------------')
print("Total number of parenting youth households: ", total_number_of_households())
print('\n')

print('--------Total number of persons in parenting youth households------------')
print("Total number of persons in parenting youth households: ", total_number_of_persons())
print('\n')

print('--------Total Parenting Youth(youth parents only) ------------')
print("Total Parenting Youth(youth parents only): ", total_number_of_youthParents())
print('\n')

print('--------Total Children in Parenting Youth Households ------------')
print("Total Children in Parenting Youth Households: ", total_number_of_children())
print('\n')

print('-------- Number of parenting youth under age 18 ------------')
print("Number of parenting youth under age 18: ", total_number_parenting_under18())
print('\n')

print('-------- Children in households with parenting youth under age 18 ------------')
print("Children in households with parenting youth under age 18: ", total_number_children_in_under18_Household())
print('\n')

print('--------  Number of parenting youth under age 18 to 24------------')
print("Number of parenting youth under age 18 to 24: ", total_number_parenting_18to24())
print('\n')

print('-------- Children in households with parenting youth under age 18 to 24 ------------')
print("Children in households with parenting youth under age 18 to 24: ", total_number_children_in_18to24_Household())
print('\n')

print("---------Gender (Youth Parents Only)---------")
print('\n')
print('--------Total Number Of Female------------')
print('Total number of female: ', total_number_of_female())
print('\n')

print('--------Total Number Of Male------------')
print('Total number of male: ', total_number_of_male())
print('\n')

print('--------Total Number Of Transgender------------')
print('Total number of Transgender: ', total_number_of_transgender())
print('\n')

print('\n')
print('--------Total Number Of Gender Non-conforming------------')
print('Total number of gender non-conforming: ', total_number_of_gender_non_conforming())
print('\n')

print('\n')
print('--------Total Number Of Gender Known------------')
print('Total number of known Gender: ', total_number_of_gender_known())
print('\n')

print("---------Ethnicity (Youth Parents Only)---------")
print('\n')

print('--------Total Number Of Non-Hispanic/Non-Latino------------')
print('Total number of non-hispanic/non-latino: ', total_number_of_ethnicity_nonlatino())
print('\n')

# print('--------Total Number Of Hispanic/Latino------------')
# print('Total number of latino/hispanic ', total_number_of_ethnicity_latino())
# print('\n')

# print('--------Total Number Of Veterans Known------------')
# print('Total number of Ethnicity Known ', total_number_of_ethnicity_Known())
# print('\n')    


# print("---------Race---------")
# print('\n')

# print('--------Total Number Of White-----------')
# print('Total number White ', total_number_of_race_white())
# print('\n')

# print('--------Total Number Of Black or African American-----------')
# print('Total number Black or African American ', total_number_of_race_African())
# print('\n')

# print('--------Total Number Of Asian-----------')
# print('Total number Asian ', total_number_of_race_Asian())
# print('\n')

# print('--------Total Number Of American Indian or Alaska Native-----------')
# print('Total number American Indian or Alaska Native ', total_number_of_race_AmericanIndian())
# print('\n')

# print('--------Total Number Of Native Hawaiian or Other Pacific Islander-----------')
# print('Total number Native Hawaiian or Other Pacific Islander ', total_number_of_race_NativeHawiian())
# print('\n')

# print('--------Total Number Of Multiple Race-----------')
# print('Total number Multiple Race ', total_number_of_race_Multiple())
# print('\n')

# print('--------Total Number Of Race Known-----------')
# print('Total number of Race Known ', total_number_of_race_known())
# print('\n')