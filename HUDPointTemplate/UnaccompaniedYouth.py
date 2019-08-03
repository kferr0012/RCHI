import pandas as pd

in_df = pd.read_csv('../../../HouseholdQuestions_Cities_Districts_040119_1300.csv')

##* Helper Function that returns total number of households
def helperFunction_Total_num_Households():

    total_children = in_df.loc[lambda df:\
        ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] <= 24) & (df['Relationship To HoH'] != 'Child'))\
            ,['ParentGlobalID','Relationship To HoH','Age As Of Today']]\
                .drop_duplicates(subset='ParentGlobalID')

    total_Adults = in_df.loc[lambda df:\
         ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] > 24))\
            ,['ParentGlobalID']]\
                .drop_duplicates(subset='ParentGlobalID')


    #set_diff_df = pd.concat([total_Adults, total_children, total_children]).drop_duplicates(keep=False)
    set_diff_df = total_children.merge(total_Adults, indicator=True, how="left", on='ParentGlobalID')[lambda x: x._merge=='left_only'].drop('_merge',1).drop_duplicates()

    return set_diff_df

##* Total number of households
def total_number_of_households(): 

    households_list = helperFunction_Total_num_Households()

    return households_list

print("---------Unit Testing ---------")
print('\n')
print("Unaccompanied Youth Household")

print('\n')
print('--------Total number of unaccompanied youth household-----------')
print("Total number of unaccompanied youth household: ", total_number_of_households())
print('\n')