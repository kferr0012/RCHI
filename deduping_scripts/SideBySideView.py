import pandas as pd
import json
import sys
from pandas.io.json import json_normalize

print("====meta data====")
#import jsons to pandas DF
#df1 = pd.read_json(str(sys.argv[1]))


for eachArg in sys.argv[1:len(sys.argv)]:
    print("file: " + str(eachArg))        
    df = json_normalize(json.load(open(str(eachArg)))).drop(columns = ['fields.category','fields.sheltered', 'fields.year', 'model', 'pk'])
    print(df)

#combine table counts



#output to excel


#open excel if possible




