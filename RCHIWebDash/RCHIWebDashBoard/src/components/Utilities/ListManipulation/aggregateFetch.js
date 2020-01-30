
export async function aggregateFetch(listOfURLs){

    console.log("aggregateFetch")
    var outputTable = {}

    for(var i = 0; i< listOfURLs.length; i++){

        var urlIndex = listOfURLs[i]
        urlIndex = urlIndex.split('/')
        urlIndex = urlIndex[urlIndex.length - 2]

        await fetch(listOfURLs[i], {
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
        })
        .then(response => response.json())
        .then((data) =>{
            console.log("data found in " + urlIndex)
            outputTable[urlIndex] = data
            
        })
        .catch(err => {
            console.log("no data found for " + urlIndex)
        })
        
    }

    console.log("fetched Data")
    console.log(outputTable)

    for(var key in outputTable){
        outputTable[key] = expandOnField(outputTable[key], "category")
    }

    console.log("expanding data")
    console.log(outputTable)

    console.log("end aggregate Fetch")
    return outputTable

}

export function expandOnField(jsonList,field){

    var differentTables = {}

    for(var i = 0; i< jsonList.length;i++){
        
        var category = jsonList[i][field]
        if(category in differentTables){
            differentTables[category].push(jsonList[i])
        }
        else{
            //not in dictionary
            differentTables[category] = []
            differentTables[category].push(jsonList[i])   
        }
    }

    return differentTables

}