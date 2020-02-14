import {host,root,availableYears,availableFiles} from '../constants/routing'

export async function aggregateFetchbyConstants(){

    console.log("aggregateFetchbyConstants")
    var fetchURL = host + root

    var outputTable = {}

    //setup table
    for(const yearKey in availableYears){
        if(!(yearKey in outputTable)){
            outputTable[yearKey] = {}
        }
        for(const file in availableFiles){
            outputTable[yearKey][file] = []
        }
    }

    for(const yearKey in availableYears){
        var year = yearKey + '/'
        for(const file in availableFiles){
            
            var fetchLink = fetchURL + year + file + "/"
            console.log("fetchlink: ")
            console.log(fetchLink)

            await fetch(fetchLink, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
                })
                .then(response => response.json())
                .then((data) =>{
                    console.log( "data found in " + fetchLink)
                    outputTable[yearKey][file] = data
                    console.log("added data")
                    
                })
                .catch(err => {
                    console.log( "no data found in " + fetchLink)
                })
        }

    }

    console.log("outputTable")
    console.log(outputTable)

    return outputTable
    
}
export async function aggregateFetch(listOfURLs, expandData = true){

    console.log("aggregateFetch")
    var outputTable = {}

    //for(var i = 0; i< listOfURLs.length; i++){
        
    var urlIndex = listOfURLs
        //var urlIndex = listOfURLs[i]
        //urlIndex = urlIndex.split('/')
        //urlIndex = urlIndex[urlIndex.length - 2]
        
        await fetch(listOfURLs, {
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
        
    //}

    console.log("fetched Data")
    console.log(outputTable)

    if(expandData){
        for(var key in outputTable){
            outputTable[key] = expandOnField(outputTable[key], "category")
        }
    }

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

    console.log("expanding data")
    console.log(differentTables)

    return differentTables

}