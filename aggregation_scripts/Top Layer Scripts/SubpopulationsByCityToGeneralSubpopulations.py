import json
from ShelteredandUnshelteredTotalCounts import getCounts, convertMapToJson

url = "../../RCHIWebDash/backend/fixtures/2020/SubpopulationsByYearFirstTimeHomeless.json"

NH_data = json.load(open(url))
countMap = {}

print(NH_data)

def main():
    getCounts(NH_data)

    print("COUNTS\n\n")
    print(countMap)
    print("\n\nRESULT\n\n")
    print(convertMapToJson())


    return 0
if __name__ == "__main__":
    main()