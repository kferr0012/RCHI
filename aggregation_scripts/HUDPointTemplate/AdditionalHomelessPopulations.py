'''

My Assumptions:

1)All this calculations are only for interview individuals. You can not observe if a individual has one of this attributes

'''
import pandas as pd

# in_df = 'pd.read_csv('../../../HouseholdQuestions_Cities_Districts_040119_1300.csv')'

#*  Save to CSV FILE
import tkinter as tk
from tkinter import filedialog
import os
def exportCSV():
    
    export_file_path = filedialog.asksaveasfilename(defaultextension='.csv')
    if not export_file_path: # asksaveasfile return `None` if dialog closed with "cancel".
        return
    data_Table().to_csv (export_file_path, index = None, header=True)

def importCSV():
    global in_df
    import_file_path = filedialog.askopenfilename(initialdir = os.getcwd(),filetypes=[("CSV Files",".csv")])
    if import_file_path:
        in_df = pd.read_csv(import_file_path)
        print("Created")

#* Helper Function to create tables for csv file
def data_Table():
    total_num_adults_Mental_Illness = total_number_adult_Mental_Illness()
    total_num_adults_Substance_Disorder = total_number_adults_Substance_Disorder()
    total_num_adults_HIV_AIDS = total_number_adults_HIV_AIDS()
    total_num_adults_Domestic_Violence = total_number_adults_Domestic_Violence()

    data = {'Additional Homeless Populations':['Adults with a Serious Mental Illness','Adults with a Substance Use Disorder','Adults with HIV/AIDS','Adult Survivors of Domestic Violence (optional)']\
            , 'Unsheltered': [total_num_adults_Mental_Illness,total_num_adults_Substance_Disorder,total_num_adults_HIV_AIDS,total_num_adults_Domestic_Violence]}

    df = pd.DataFrame(data)
    df['Unsheltered'] = df['Unsheltered'].astype(int)
    
    return df

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

root= tk.Tk()
root.title('Menu')
canvas1 = tk.Canvas(root, width = 300, height = 300, bg = 'seashell3', relief = 'raised')
canvas1.pack()
saveAsButton_CSV = tk.Button(text='Export CSV', command=exportCSV, bg='red', fg='black', font=('helvetica', 15, 'bold'))
loadAsButton_CSV = tk.Button(text='Import CSV', command=importCSV, bg='red', fg='black', font=('helvetica', 15, 'bold'))
cancelButton = tk.Button(text='Cancel',command=root.destroy ,bg='red', fg='black', font=('helvetica', 15, 'bold'))
canvas1.create_window(75, 150, window=loadAsButton_CSV)
canvas1.create_window(225, 150, window=saveAsButton_CSV)
canvas1.create_window(150, 225, window=cancelButton)
root.mainloop()