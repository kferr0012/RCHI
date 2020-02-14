import json

# read file
try:
    with open('./JSON/2019/VolunteerDeployment.json', 'r') as myfile:
        data=myfile.read()

    jsonData = json.loads(data)

except(FileNotFoundError):
    print("[OLD JSON FILE NOT FOUND, GENERATING NEW ONE]")
    jsonData = []


year = input("Input Year: ")
model = 'backend.VolunteerDeployment' + year 
data = []
count = len(jsonData)


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

print("[CREATING NEW JSON FILE]")



for x in jsonData:
    x['model'] = model
    x['fields']['count'] = 0
    x['fields']['year'] = year

out = open('./JSON/2020/VolunteerDeployment.json','w')

out.write (json.dumps(jsonData, cls=NpEncoder, indent=4))
out.close()

print("[FINISHED WRITING DATA INTO JSON]")