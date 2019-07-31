'''
My Assumptions:

1) How my code works is that the helperfunction gets every ParentGlobalID (removing any duplicates) from all 
 household with only a child. The way it gets it is by creating two sets one with only children and there ParentGlobalID
and the second set is the ParentGlobalID of non children . Then it gets the set difference between the two sets to get the ParentGlobalID that belong in only
the children set(set 1)/

2) The rest of the functions use the helperfunction to get all the  Only Children  Household(set 1) ParentGlobalID
and checks if the new set (Set 2) depending of the function is in Set 1 and returns the sum of all true.

##? For the Helper Function I am Assuming that we are only allowed to use ParentGlobalID column 
##? I am also assuming that the Under24 counts as a Young Adults


##! TODO
Chronically Homeless Function
Wrote them based on the csv column 'Chronically Homeless Status'
'''


import pandas as pd
in_df = pd.read_csv('../../../HouseholdQuestions_Cities_Districts_040119_1300.csv')

##* Helper Function that returns total number of households
def helperFunction_Total_num_Households():

    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18'))\
               ,['ParentGlobalID']]\
                   .drop_duplicates(subset='ParentGlobalID')

    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18))\
           | ((df['Household Survey Type'] == 'Observation') & ((df['Age Observed'] == 'Over25') | (df['Age Observed'] == 'Under24')))\
                ,['ParentGlobalID']]\
                    .drop_duplicates(subset='ParentGlobalID')


    #set_diff_df = pd.concat([total_Adults, total_children, total_children]).drop_duplicates(keep=False)
    set_diff_df = total_children.merge(total_Adults, indicator=True, how="left")[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df

##* Total number of households
def total_number_of_households(): 

    households_list = helperFunction_Total_num_Households().shape[0]

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

##* Total number of female
def total_number_of_female():
    households_list =  helperFunction_Total_num_Households()

    total_female = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Gender'] == 'Female'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Gender Observed'] == 'Female'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_female 

##* Total number of male
def total_number_of_male():
    households_list =  helperFunction_Total_num_Households()

    total_male = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Gender'] == 'Male'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Gender Observed'] == 'Male'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_male 

##* Total number of transgender
def total_number_of_transgender():
    households_list =  helperFunction_Total_num_Households()

    total_transgender = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Gender'] == 'MTF') | (df['Gender'] == 'FTM'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()
    
    return total_transgender 

##* Total number of GenderConforming
def total_number_of_gender_non_conforming():
    households_list =  helperFunction_Total_num_Households()

    total_gender_non_conforming = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Gender'] == 'GenderNonConforming'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()
    
    return total_gender_non_conforming 

##* Total number of Known Gender
def total_number_of_gender_known():
    households_list =  helperFunction_Total_num_Households()

    total_gender_Known = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Gender'] != 'DoesntKnow'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Gender Observed'] != 'NotSure'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_gender_Known 

##* Total number of non latinos/hispanics
def total_number_of_ethnicity_nonlatino():
    households_list =  helperFunction_Total_num_Households()

    total_number_non_LatHisp = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Ethnicity'] == 'No'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Hispanic Observed'] == 'NonHispanic'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_non_LatHisp 

##* Total number of latinos/hispanics
def total_number_of_ethnicity_latino():
    households_list =  helperFunction_Total_num_Households()

    total_number_LatHisp = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Ethnicity'] == 'Yes'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Hispanic Observed'] == 'Hispanic'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_LatHisp 

##* Total number of Ethnicity Known
def total_number_of_ethnicity_Known():
    households_list =  helperFunction_Total_num_Households()

    total_EthnicityKnown = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Ethnicity'] != 'DoesntKnow'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Hispanic Observed'] != 'NotSure'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_EthnicityKnown 

##* Total number of White
def total_number_of_race_white():
    households_list =  helperFunction_Total_num_Households()

    total_number_white = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Race'] == 'White'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Race Observed'] == 'White'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_white

##* Total number of African 
def total_number_of_race_African():
    households_list =  helperFunction_Total_num_Households()

    total_number_black = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Race'] == 'Black'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Race Observed'] == 'Black'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_black

##* Total number of Asian 
def total_number_of_race_Asian():
    households_list =  helperFunction_Total_num_Households()

    total_number_asian = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Race'] == 'Asian'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Race Observed'] == 'Asian'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    
    return total_number_asian

##* Total number American Indian
def total_number_of_race_AmericanIndian():
    households_list =  helperFunction_Total_num_Households()

    total_number_AmericanIndian = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Race'] == 'AmericanIndian'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Race Observed'] == 'AmericanIndian'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_AmericanIndian

##* Total number Native Hawaiian or Other Pacific Islander
def total_number_of_race_NativeHawiian():
    households_list =  helperFunction_Total_num_Households()

    total_number_NativeHawaiian = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Race'] == 'NativeHawaiian'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Race Observed'] == 'NativeHawaiian'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_NativeHawaiian

##* Total number Multiple Race
def total_number_of_race_Multiple():
    households_list =  helperFunction_Total_num_Households()

    total_number_multiple = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Race'] == 'Multiple'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Race Observed'] == 'Multiple'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_multiple

##* Total number Race Known
def total_number_of_race_known():
    households_list =  helperFunction_Total_num_Households()

    total_number_of_race_known = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Race'] != 'DoesntKnow'))\
           | ((df['Household Survey Type'] == 'Observation') & (df['Age Observed'] == 'Under18') & (df['Race Observed'] != 'NotSure'))\
               , ['ParentGlobalID']]['ParentGlobalID']\
                    .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_of_race_known

##! TODO
def total_number_of_ChronicallyHomeless():

    households_list =  helperFunction_Total_num_Households()

    total_number_of_ChronicallyHomeless = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_of_ChronicallyHomeless


print("---------Unit Testing ---------")
print('\n')
print("HouseHold With Only Children")

print('\n')
print('--------Total Number Of HouseHolds------------')
print("Total number of households: ", total_number_of_households())
print('\n')

print('--------Total Number Of Children ------------')
print('Total number of Children: ', total_number_of_children())
print('\n')

print('--------Total Number Of Female------------')
print('Total number of Female: ', total_number_of_female())
print('\n')

print('--------Total Number Of Male------------')
print('Total number of Male: ', total_number_of_male())
print('\n')

print('--------Total Number Of Transgender------------')
print('Total number of Transgender: ', total_number_of_transgender())
print('\n')

print('--------Total Number Of Gender Non-conforming------------')
print('Total number of gender non-conforming: ', total_number_of_gender_non_conforming())
print('\n')

print('\n')
print('--------Total Number Of Gender Known------------')
print('Total number of known : ', total_number_of_gender_known())
print('\n')

print("---------Ethnicity---------")
print('\n')

print('--------Total Number Of Non-Hispanic/Non-Latino------------')
print('Total number of non-hispanic/non-latino: ', total_number_of_ethnicity_nonlatino())
print('\n')

print('--------Total Number Of  Hispanic/Latino------------')
print('Total number of latino/hispanic ', total_number_of_ethnicity_latino())
print('\n')

print('--------Total Number Of Ethnicity Known------------')
print('Total number of Ethnicity Known ', total_number_of_ethnicity_Known())
print('\n')  


print("---------Race---------")
print('\n')

print('--------Total Number Of White-----------')
print('Total number White ', total_number_of_race_white())
print('\n')

print('--------Total Number Of Black or African American-----------')
print('Total number Black or African American ', total_number_of_race_African())
print('\n')

print('--------Total Number Of Asian-----------')
print('Total number Asian ', total_number_of_race_Asian())
print('\n')

print('--------Total Number Of American Indian or Alaska Native-----------')
print('Total number American Indian or Alaska Native ', total_number_of_race_AmericanIndian())
print('\n')

print('--------Total Number Of Native Hawaiian or Other Pacific Islander-----------')
print('Total number Native Hawaiian or Other Pacific Islander ', total_number_of_race_NativeHawiian())
print('\n')

print('--------Total Number Of Multiple Race-----------')
print('Total number Multiple Race ', total_number_of_race_Multiple())
print('\n')

print('--------Total Number Of Race Known-----------')
print('Total number of Race Known ', total_number_of_race_known())
print('\n')

print("---------Chronically Homeless---------")
print('\n')


# ##* Ask About the correct value 
# print('--------Total Number Of Chronically Homeless Persons-----------')
# print('Total number Chronically Homeless\n ', total_number_of_ChronicallyHomeless())
# print('\n')