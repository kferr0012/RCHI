// import {host,root,availableYears,availableFiles} from '../constants/routing'

// export async function aggregateFetchbyConstants(){

//     var fetchURL = host + root

//     var outputTable = {}

//     //setup table
//     for(const yearKey in availableYears){
//         if(!(yearKey in outputTable)){
//             outputTable[yearKey] = {}
//         }
//         for(const file in availableFiles){
//             outputTable[yearKey][file] = []
//         }
//     }

//     for(const yearKey in availableYears){
//         var year = yearKey + '/'
//         for(const file in availableFiles){
            
//             var fetchLink = fetchURL + year + file + "/"

//             await fetch(fetchLink, {
//                 headers: {
//                     'Accept': 'application/json',
//                     'X-Requested-With': 'XMLHttpRequest'
//                 }
//                 })
//                 .then(response => response.json())
//                 .then((data) =>{
//                     //console.log( "data found in " + fetchLink)
//                     outputTable[yearKey][file] = data
//                     //console.log("added data")
                    
//                 })
//                 .catch(err => {
//                     //console.log( "no data found in " + fetchLink)
//                 })
//         }

//     }

//     return outputTable
    
// }
export async function aggregateFetch(listOfURLs, expandData = true){

    var outputTable = {}


    for(var i = 0; i< listOfURLs.length; i++){
        
        //create index to store the data
        var mapIndex = getIndex(listOfURLs[i])
        
        await fetch(listOfURLs[i], {
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
        })
        .then(response => response.json())
        .then((data) =>{
            outputTable[mapIndex] = data
            
        })
        .catch(err => {

        })
        
    }


    if(expandData){
        for(var key in outputTable){
            outputTable[key] = expandOnField(outputTable[key], "category")
        }
    }

    return outputTable

}

function getIndex(link){

  link = link.split('/')
  var outputStr = ""

  //initialize i = 4 because all data is within the same root
  for(var i = 4 ; i < link.length-1 ; i++){
    outputStr += link[i] + '/'
  } 

  /*
  example;
  input
  */
  return outputStr.substring(0,outputStr.length-1)
}

export function expandOnField(jsonList,field){


    var differentTables = {}


    for(var i = 0; i< jsonList.length;i++){
        
        var category = jsonList[i][field]


        try{
            if(category in differentTables){
                differentTables[category].push(jsonList[i])
            }
            else{
                //not in dictionary
                differentTables[category] = []
                differentTables[category].push(jsonList[i])   
            }
        }
        catch{
            throw Error("INDEX ERROR: expandOnField trying to access the category: " + category)
        }
    }



    return differentTables

}