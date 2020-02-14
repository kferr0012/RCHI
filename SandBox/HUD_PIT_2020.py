import pandas as pd
import json
import sys

#! Check later if counts are correct

#Command : python [script_name] [filepath_to_csv] [model_name]

# #Checks if file path was entered as parameter
# if len(sys.argv) is 1:
#     print("File path must be passed in as parameter")
#     exit()

# #Checks if tableName was entered as parameter
# if len(sys.argv) is 2:
#     print("Name for model must be entered as a parameter")
#     exit()

# #Check if too many parameters
# if len(sys.argv) > 3:
#     print("Too many parameters")
#     exit()



#LOAD DATA FROM PARAMTERS
#Insert file path of CSV here!
#Example: "./EmergencyShelter2020.csv"
myData = pd.read_csv('../Data/EmergencyShelter2020.csv')

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

#ReplaceMe
year = input("Input Year: ")

modelName = "backend.GeneralTableSubpopulationsSheltered" + year


#HELPER FUNCTIONS

#Prints all the unique values in a column
#Only reports the values seen
#so it'll miss unanswered values
def get_unique_values(column_name):
    output = []
    for index, row in myData.iterrows():
        val = row[column_name]
        if val not in output:
            output.append(val)
    print(output)

#Builds Python Objects
def build_python_object(id,nested_object):
    #Build Python Object
    python_object = {
        "pk":str(id),
        "model":modelName,
        "fields":nested_object
    }
    return python_object

def build_nested_python_object(category,subpopulation,total):
    nested_python_object = {
        "category":str(category),
        "subpopulation":str(subpopulation),
        "interview":int(total),
        "observation":0,
        "total":int(total)
    }
    return nested_python_object

#Checks[Prints] if a column contains any empty cells
def check_for_empty_cells(column_name):

    for index, row in myData.iterrows():
        val = row[column_name]

        if pd.isna(val):
            print("1 or more empty cells in column: " + str(column_name))
            return

    #Implicit Else Statement
    print("0 empty cells found in column: " + str(column_name))


#FILTERING FUNCTIONS
def get_Total_Individuals():
    counter = 0
    for index, row in myData.iterrows():
        counter+=1

    return counter


def get_Age_Adults():
    counter = 0
    for index, row in myData.iterrows():
        age = row["Age"]
        if age > 24:
            counter+=1

    return counter

def get_Age_Children():
    counter = 0
    for index, row in myData.iterrows():
        age = row["Age"]
        if age < 18:
            counter+=1
    # print("Total Children: " + str(counter))
    return counter

def get_Age_Youth():
    counter = 0
    for index, row in myData.iterrows():
        age = row["Age"]
        if age >= 18 and age <= 24:
            counter+=1
    # print("Total Youth: " + str(counter))
    return counter

def get_Age_Unknown_Age():
    counter = 0
    for index, row in myData.iterrows():
        age = row["Age"]

        #Exception handling to check if cell is empty
        #Alternatively can use .isna() method
        try:
            val = int(age)
        except ValueError:
            counter+=1
    # print("Total Unknown Age: " + str(counter))
    return counter

def get_Subpopulations_Households():
    case_id_list = []
    for index, row in myData.iterrows():
        #Need to figure out how to determine which individuals are part of the same household
        val = row["CaseIdentifier"]
        if val not in case_id_list:
            case_id_list.append(val)
    # print("Total Subpopulations Households: " + str(len(case_id_list)))
    return len(case_id_list)

def get_Subpopulations_Chronically_Homeless():
    counter =  0
    for index, row in myData.iterrows():
        ch_val = row["Chronic"]
        if str(ch_val) == "Yes":
            counter+=1
    # print("Total Chronically Homeless: " + str(counter))
    return counter

def get_Subpopulations_Families_with_Children():
    #Families w/ Children
    counter = 0
    for index, row in myData.iterrows():
        val = row["HouseholdType"]
        if str(val) == "Children and Adults" or str(val) == "Only Children":
            counter+=1
    # print("Total Families W/ Children: " + str(counter))
    return counter

def get_Subpopulations_Substance_Abuse():
    counter = 0
    for index, row in myData.iterrows():
        val = row["SubstanceAbuse"]
        if str(val) == "Yes":
            counter+=1
    # print("Total Substance Abuse: " + str(counter))
    return counter

def get_Subpopulations_Mental_Health_Conditions():
    counter = 0
    for index, row in myData.iterrows():
        val = row["MentallyIll"]
        if str(val) == "Yes":
            counter+=1
    # print("Total Mental Health Conditions: " + str(counter))
    return counter

def get_Subpopulations_Veterans():
    counter = 0
    for index, row in myData.iterrows():
        val = row["VeteranStatus"]
        if str(val) == "Yes":
            counter+=1
    # print("Total Veterans: " + str(counter))
    return counter

def get_Race_Asian():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Race"]
        if str(val) == "Asian":
            counter+=1
    # print("Total Asian: " + str(counter))
    return counter

def get_Race_American_Indian():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Race"]
        if str(val) == "American Indian or Alaska Native":
            counter+=1
    # print("Total American Indian: " + str(counter))
    return counter

def get_Race_Black():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Race"]
        if str(val) == "Black or African American":
            counter+=1
    # print("Total Black: " + str(counter))
    return counter

def get_Race_White():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Race"]
        if str(val) == "White":
            counter+=1
    # print("Total White: " + str(counter))
    return counter

def get_Race_Multiple_Races():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Race"]
        if str(val) == "Multi-Racial":
            counter+=1
    # print("Total Multiple Races: " + str(counter))
    return counter

#CheckMe: Needs to be double checked for actual value name
def get_Race_Native_Hawaiian():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Race"]
        #check if string is actually "Native Hawaiian"
        if "Hawai" in str(val):
            counter+=1
    # print("Total Native Hawaiian: " + str(counter))
    return counter

def get_Race_Unknown_Race():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Race"]
        if str(val) == "Client doesn't know":
            counter+=1
    # print("Total Unknown Race: " + str(counter))
    return counter

def get_Gender_Male():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Gender"]
        if str(val) == "Male":
            counter+=1
    # print("Total Male: " + str(counter))
    return counter

def get_Gender_Female():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Gender"]
        if str(val) == "Female":
            counter+=1
    # print("Total Female: " + str(counter))
    return counter


def get_Gender_Transgender():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Gender"]
        if str(val) == "Trans Female (MTF or Male to Female)":
            counter+=1
    # print("Total Transgender: " + str(counter))
    return counter

#CheckMe
def get_Gender_Gender_Non_Conf():
    #Need to check if "Gender Non-Conf" is the correct name
    counter = 0
    for index, row in myData.iterrows():
        val = row["Gender"]
        if "Non" in str(val):
            counter+=1
    # print("Total Gender Non-Conf: " + str(counter))
    return counter

#CheckMe
def get_Gender_Unknown():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Gender"]
        if str(val) == "Client refused":
            counter+=1
    # print("Total Gender Unknown: " + str(counter))
    return counter

def get_Ethnicity_Hispanic():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Ethnicity"]
        if str(val) == "Hispanic/Latino":
            counter+=1
    # print("Total Hispanic: " + str(counter))
    return counter

def get_Ethnicity_Non_Hispanic():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Ethnicity"]
        if str(val) == "Non-Hispanic/Latino":
            counter+=1
    # print("Total Non-Hispanic: " + str(counter))
    return counter

def get_Ethnicity_Unknown():
    counter = 0
    for index, row in myData.iterrows():
        val = row["Ethnicity"]
        if str(val) == "Client refused" or str(val) == "Client doesn't know" or str(val) == "Data not collected":
            counter+=1
    # print("Total Ethnicity Unknown: " + str(counter))
    return counter

def get_Household_Adults_Only():
    counter = 0
    for index, row in myData.iterrows():
        val = row["HouseholdType"]
        if str(val) == "Without Children":
            counter+=1
    # print("Total Household Adults Only: " + str(counter))
    return counter

def get_Household_Adults_and_Children():
    counter = 0
    for index, row in myData.iterrows():
        val = row["HouseholdType"]
        if str(val) == "Children and Adults":
            counter+=1
    # print("Total Household Children and Adults: " + str(counter))
    return counter

def get_Household_Children_Only():
    counter = 0
    for index, row in myData.iterrows():
        val = row["HouseholdType"]
        if str(val) == "Only Children":
            counter+=1
    # print("Total Household Children Only: " + str(counter))
    return counter


#http://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/
#Only actually has 29 objects; Missing id:"12"

#MAIN
python_list = []

#Insert python objects into python list




python_list.append(build_python_object(1,build_nested_python_object("Total","Individuals",get_Total_Individuals())))
python_list.append(build_python_object(2,build_nested_python_object("Age","Adults",get_Age_Adults())))
python_list.append(build_python_object(3,build_nested_python_object("Age","Children",get_Age_Children())))
python_list.append(build_python_object(4,build_nested_python_object("Age","Youth",get_Age_Youth())))
python_list.append(build_python_object(5,build_nested_python_object("Age","Unknown Age",get_Age_Unknown_Age())))
python_list.append(build_python_object(6,build_nested_python_object("Subpopulations","Households",get_Subpopulations_Households())))
python_list.append(build_python_object(7,build_nested_python_object("Subpopulations","Chronically Homeless",get_Subpopulations_Chronically_Homeless())))
python_list.append(build_python_object(8,build_nested_python_object("Subpopulations","Families w/ Children",get_Subpopulations_Families_with_Children())))
python_list.append(build_python_object(9,build_nested_python_object("Subpopulations","Substance Abuse",get_Subpopulations_Substance_Abuse())))
python_list.append(build_python_object(10,build_nested_python_object("Subpopulations","Mental Health Conditions",get_Subpopulations_Mental_Health_Conditions())))
python_list.append(build_python_object(11,build_nested_python_object("Subpopulations","Veterans",get_Subpopulations_Veterans())))
python_list.append(build_python_object(13,build_nested_python_object("Race","Asian",get_Age_Adults())))
python_list.append(build_python_object(14,build_nested_python_object("Race","American Indian", get_Race_American_Indian())))
python_list.append(build_python_object(15,build_nested_python_object("Race","Black",get_Race_Black())))
python_list.append(build_python_object(16,build_nested_python_object("Race","White",get_Race_White())))
python_list.append(build_python_object(17,build_nested_python_object("Race","Multiple Races",get_Race_Multiple_Races())))
python_list.append(build_python_object(18,build_nested_python_object("Race","Native Hawaiian",get_Race_Native_Hawaiian())))
python_list.append(build_python_object(19,build_nested_python_object("Race","Unknown Race",get_Race_Unknown_Race())))
python_list.append(build_python_object(20,build_nested_python_object("Gender","Male",get_Gender_Male())))
python_list.append(build_python_object(21,build_nested_python_object("Gender","Female", get_Gender_Female())))
python_list.append(build_python_object(22,build_nested_python_object("Gender","Transgender",get_Gender_Transgender())))
python_list.append(build_python_object(23,build_nested_python_object("Gender","Gender Non-Conf",get_Gender_Gender_Non_Conf())))
python_list.append(build_python_object(24,build_nested_python_object("Gender","Unknown",get_Gender_Unknown())))
python_list.append(build_python_object(25,build_nested_python_object("Ethnicity","Hispanic",get_Ethnicity_Hispanic())))
python_list.append(build_python_object(26,build_nested_python_object("Ethnicity","Non-Hispanic",get_Ethnicity_Non_Hispanic())))
python_list.append(build_python_object(27,build_nested_python_object("Ethnicity","Unknown",get_Ethnicity_Unknown())))
python_list.append(build_python_object(28,build_nested_python_object("Household","Adults Only",get_Household_Adults_Only())))
python_list.append(build_python_object(29,build_nested_python_object("Household","Adults and Children",get_Household_Adults_and_Children())))
python_list.append(build_python_object(30,build_nested_python_object("Household","Children Only",get_Household_Children_Only())))

# #Convert List of Python Objects to List of JSON
# json_list = []
# for item in python_list:
#     new_json = json.dumps(item)
#     json_list.append(new_json)

# print("\nhttp://127.0.0.1:8000/api/GeneralTableSubpopulationsSheltered2019/\n")

#Print List of JSONs
out = open('./JSON/2020/GeneralTableSubpopulationsSheltered.json','w')

out.write (json.dumps(python_list, cls=NpEncoder, indent=4))
out.close()