'''
My Assumptions:

1)All this calculations are only for interview individuals. You can not observe if a individual has one of this attributes

'''
import pandas as pd

in_df = pd.read_csv('../../../HouseholdQuestions_Cities_Districts_040119_1300.csv')

#* Adults with a Serious Mental Illness
def total_number_adult_Mental_Illness():
    total_num_adult_Mental_Illness = in_df.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['Mental Health Issue'] == 'Yes')), ['ParentGlobalID']].shape[0]
    
    return total_num_adult_Mental_Illness

#* Adults with a Substance Use Disorder
def total_number_adults_Substance_Disorder():
    total_num_adults_Substance_Disorder = in_df.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['Substance Abuse'] == 'Yes')), ['ParentGlobalID']].shape[0]
   
    return total_num_adults_Substance_Disorder

#* Adults with HIV/AIDS
def total_number_adults_HIV_AIDS():
    total_num_adults_HIV_AIDS = in_df.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['HIV/AIDS'] == 'Yes')), ['ParentGlobalID']].shape[0]

    return total_num_adults_HIV_AIDS

#* Adult Survivors of Domestic Violence (optional)
def total_number_adults_Domestic_Violence():
    total_num_adults_Domestic_Violence = in_df.loc[lambda df: ((df['Household Survey Type'] == 'Interview') & (df['Age As Of Today'] >= 18) & (df['Domestic Violence Victim'] == 'Yes')), ['ParentGlobalID']].shape[0]

    return total_num_adults_Domestic_Violence


print("------------Unit Testing----------")

print('\n')
print('---------Additional Homeless Populations---------')
print('\n')

print('Adults with a Serious Mental Illness')
print('Total Adults with a Serious Mental Illness: ', total_number_adult_Mental_Illness())
print('\n')

print('Adults with a Substance Use Disorder')
print('Total Adults with a Substance Use Disorder: ', total_number_adults_Substance_Disorder())
print('\n')

print('Adults with HIV/AIDS')
print('Total Adults with HIV/AIDS: ', total_number_adults_HIV_AIDS())
print('\n')

print('Adult Survivors of Domestic Violence')
print('Total Adult Survivors of Domestic Violence: ', total_number_adults_Domestic_Violence())
print('\n')