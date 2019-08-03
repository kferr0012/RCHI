
import pandas as pd
in_df = pd.read_csv('../../../HouseholdQuestions_Cities_Districts_040119_1300.csv')

##* Helper Function that returns total number of households
def helperFunction_Total_num_Households():
 
    total_unaccompanied_Youth = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] != 'Child'))\
            ,['ParentGlobalID','Relationship To HoH','Age As Of Today']]\
                .drop_duplicates(subset='ParentGlobalID')

    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] > 24))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')
    
    
    total_children_relationship = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Child'))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')
    

    # #set_diff_df = pd.concat([total_Adults, total_children, total_children]).drop_duplicates(keep=False)
    set_diff_df = total_unaccompanied_Youth.merge(total_Adults, indicator=True, how="left", on='ParentGlobalID')[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()
    households_list = pd.merge(set_diff_df, total_children_relationship, how='inner').drop_duplicates(subset='ParentGlobalID')

    return households_list

##* Total number of households
def total_number_of_households(): 

    households_list = helperFunction_Total_num_Households().shape[0]

    return households_list

##* Total number of persons
def total_number_of_persons():
    households_list =  helperFunction_Total_num_Households()

    total_persons = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()

    # total_persons = in_df['ParentGlobalID'].isin(households_list['ParentGlobalID']).sum()
    
    return total_persons

##* Total Parenting Youth (youth parents only)
def total_number_of_parents():
    households_list = helperFunction_Total_num_Households()

    total_parents = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()
    
    return total_parents

#* Total Children in Parenting Youth Households
def total_children_in_Youth_Households():
    households_list = helperFunction_Total_num_Households()

    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Child'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()
    
    return total_children

#* Number of parenting youth under age 18
def total_parenting_youth_under18():
    households_list = helperFunction_Total_num_Households()

    total_parenting_under18 = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Self'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()
    
    return total_parenting_under18

#* Children in households with parenting youth under age 18
def total_children_in_Under18_Households():
    households_list = helperFunction_Total_num_Households()

    under_18 = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Self'))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')
    
    parents_under18 = pd.merge(under_18, households_list, how='inner').drop_duplicates(subset='ParentGlobalID')

    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Child'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(parents_under18['ParentGlobalID']).sum()
    
    return total_children

#* Number of parenting youth age 18 to 24
def total_parenting_youth_18to24():
    households_list = helperFunction_Total_num_Households()

    total_parents_18to24 = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & ((df['Age As Of Today'] >= 18) & (df['Age As Of Today'] <= 24)) & (df['Relationship To HoH'] == 'Self'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(households_list['ParentGlobalID']).sum()
    
    
    return total_parents_18to24

#* Children in households with parenting youth age 18 to 24
def total_children_in_18to24_Households():
    households_list = helperFunction_Total_num_Households()

    total_18to24 = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & ((df['Age As Of Today'] >= 18) & (df['Age As Of Today'] <= 24)) & (df['Relationship To HoH'] == 'Self'))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')
    
    parents_18to24 = pd.merge(total_18to24, households_list, how='inner').drop_duplicates(subset='ParentGlobalID')

    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] < 18) & (df['Relationship To HoH'] == 'Child'))\
            , ['ParentGlobalID']]['ParentGlobalID']\
                .isin(parents_18to24['ParentGlobalID']).sum()
    
    return total_children

##* Total number of female
def total_number_of_female():
    households_list =  helperFunction_Total_num_Households()

    total_female = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Gender'] == 'Female') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_female

##* Total number of male
def total_number_of_male():
    households_list =  helperFunction_Total_num_Households()

    total_male = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Gender'] == 'Male') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_male

##* Total number of transgender
def total_number_of_transgender():
    households_list =  helperFunction_Total_num_Households()

    total_transgender = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & ((df['Gender'] == 'MTF') | (df['Gender'] == 'FTM'))& (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_transgender

##* Total number of GenderConforming
def total_number_of_gender_non_conforming():
    households_list =  helperFunction_Total_num_Households()

    total_gender_non_conforming = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Gender'] == 'GenderNonConforming') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_gender_non_conforming

##* Total number of Known Gender
def total_number_of_gender_known():
    households_list =  helperFunction_Total_num_Households()

    total_gender_Known = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') &(df['Gender'] != 'DoesntKnow') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_gender_Known

##* Total number of non latinos/hispanics
def total_number_of_ethnicity_nonlatino():
    households_list =  helperFunction_Total_num_Households()

    total_number_non_LatHisp = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Ethnicity'] == 'No') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()

    return total_number_non_LatHisp

##* Total number of latinos/hispanics
def total_number_of_ethnicity_latino():
    households_list =  helperFunction_Total_num_Households()

    total_number_LatHisp = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Ethnicity'] == 'Yes') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_LatHisp

##* Total number of Ethnicity Known
def total_number_of_ethnicity_Known():
    households_list =  helperFunction_Total_num_Households()

    total_number_LatHisp = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Ethnicity'] != 'DoesntKnow') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_LatHisp

##* Total number of White
def total_number_of_race_white():
    households_list =  helperFunction_Total_num_Households()

    total_number_white = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'White') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_white

##* Total number of African 
def total_number_of_race_African():
    households_list =  helperFunction_Total_num_Households()

    total_number_black = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Black') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_black

##* Total number of Asian 
def total_number_of_race_Asian():
    households_list =  helperFunction_Total_num_Households()

    total_number_asian = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Asian') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_asian

##* Total number Native Hawaiian or Other Pacific Islander
def total_number_of_race_NativeHawiian():
    households_list =  helperFunction_Total_num_Households()

    total_number_NativeHawaiian = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'NativeHawaiian') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_NativeHawaiian

##* Total number American Indian
def total_number_of_race_AmericanIndian():
    households_list =  helperFunction_Total_num_Households()

    total_number_AmericanIndian = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'AmericanIndian') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_AmericanIndian

##* Total number Multiple Race
def total_number_of_race_Multiple():
    households_list =  helperFunction_Total_num_Households()

    total_number_multiple = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] == 'Multiple') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_multiple

##* Total number Race Known
def total_number_of_race_known():
    households_list =  helperFunction_Total_num_Households()

    total_number_of_race_known = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Race'] != 'DoesntKnow') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] == 'Self'))\
                , ['ParentGlobalID']]['ParentGlobalID']\
                            .isin(households_list['ParentGlobalID']).sum()
    
    return total_number_of_race_known

##! TODO
def total_number_of_ChronicallyHomeless():

    households_list =  helperFunction_Total_num_Households()

    total_number_of_ChronicallyHomeless = in_df.loc[lambda df:\
       ((df['Household Survey Type'] == 'Interview') & (df['Chronically Homeless Status'] == 1))\
            , ['ParentGlobalID']]['ParentGlobalID']
    
    return total_number_of_ChronicallyHomeless



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

print('--------Total Parenting Youth (youth parents only)------------')
print("Total Parenting Youth (youth parents only): ", total_number_of_parents())
print('\n')

print('--------Total Children in Parenting Youth Households------------')
print("Total Children in Parenting Youth Households: ", total_children_in_Youth_Households())
print('\n')

print('--------Number of parenting youth under age 18------------')
print("Number of parenting youth under age 18: ", total_parenting_youth_under18())
print('\n')

print('--------Children in households with parenting youth under age 18------------')
print("Children in households with parenting youth under age 18: ", total_children_in_Under18_Households())
print('\n')

print('--------Number of parenting youth age 18 to 24------------')
print("Number of parenting youth age 18 to 24 ", total_parenting_youth_18to24())
print('\n')

print('-------Children in households with parenting youth age 18 to 24------------')
print("Children in households with parenting youth age 18 to 24: ", total_children_in_18to24_Households())
print('\n')

print("Gender (youth parents only)")
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

print('--------Total Number Of Gender Known------------')
print('Total number of known : ', total_number_of_gender_known())
print('\n')

print("---------Ethnicity (youth parents only)---------")
print('\n')

print('--------Total Number Of Non-Hispanic/Non-Latino------------')
print('Total number of non-hispanic/non-latino: ', total_number_of_ethnicity_nonlatino())
print('\n')

print('--------Total Number Of  Hispanic/Latino------------')
print('Total number of latino/hispanic ', total_number_of_ethnicity_latino())
print('\n')

print('--------Total Number Of Veterans Ethnicity Known------------')
print('Total number of Ethnicity Known ', total_number_of_ethnicity_Known())
print('\n')  


print("---------Race (youth parents only)---------")
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