
import json

with open('./JSON/2019/CityTotalsByYear.json') as json_file:
    django_Version = json.load(json_file) 


with open('./JSON/2020/CityTotalsByYear.json') as json_file:
    script_Version = json.load(json_file) 


print(django_Version)


django_list = [ x["fields"]['city'] for x in django_Version]

script_list = [ x["fields"]['city'] for x in script_Version]


set_django = set(django_list)
set_scripts = set(script_list)


print(set_django)
print(len(set_scripts))


for cat in set_django:
    print(cat)
    if cat not in set_scripts:
        print("[NOT IN]: ", cat)