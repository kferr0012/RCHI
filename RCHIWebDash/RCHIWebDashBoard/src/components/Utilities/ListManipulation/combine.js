// combines two arrays omitting any objects with the same id
// function assumes no duplication of ids within a single array
export function combine ( array1, array2 ) {
    var ids = new Set([]);
    var cb = array1;
    for ( var x = 0; x < array1.length; x++ ) {
        ids.add(array1[x].id);
    }
    for ( var x = 0; x < array2.length; x++ ) {
        if ( !ids.has(array2[x].id) ) {
            cb.push(array2[x]);
        }
    }
    return cb;
}

export function combineCountsByCategory(data){

    var countMap = {}
    for(const row in data){
      var fields = data[row]
  
      if(!(fields.category in countMap)){
        countMap[fields.category] = {}
      }
  
      if(!(fields.subpopulation in countMap[fields.category])){
        countMap[fields.category][fields.subpopulation] = {
            subpopulation : fields.subpopulation,
            category : fields.category,
            year : fields.year,
            interview : 0,
            observation : 0,
            total : 0
  
          }
      }
      
      countMap[fields.category][fields.subpopulation].interview += fields.interview
      countMap[fields.category][fields.subpopulation].observation += fields.observation
      countMap[fields.category][fields.subpopulation].total += fields.total
  
    }
  
    //create Json
    var outputTable = []
    for (const category in countMap){
      
      for(const subpopulation in countMap[category]){
        outputTable.push(countMap[category][subpopulation])
      }
    }
    console.log("results")
  
    for(const x in outputTable){
      console.log(outputTable[x])
    }
    
    return outputTable
  
  }

export function combineCounts(list1, list2){

    console.log("COMBINE COUNTS")
    console.log(list1)
    console.log(list2)

    //make hard copies 
    list1 = JSON.parse(JSON.stringify(list1))
    list2 = JSON.parse(JSON.stringify(list2))

    var resultCountsMap = {}

    //gather counts from list1
    for(var index in list1){
        //json get
        var myJson = list1[index]
        console.log("myJson")
        console.log(myJson)
        var category = myJson["category"]
        var subpopulation = myJson["subpopulation"]
        if (!(category in resultCountsMap)){
            resultCountsMap[category] = {}
        }
        
        if (!(subpopulation in resultCountsMap[category])){
            resultCountsMap[category][subpopulation] = {
                "interview" : myJson["category"]["subpopulation"]["interview"], 
                "observation" : myJson["category"]["subpopulation"]["observation"], 
                "total" : myJson["category"]["subpopulation"]["total"], 
            }

        }
        else{
            resultCountsMap[category][subpopulation]["interview"] += list1["category"]["subpopulation"]["interview"]
            resultCountsMap[category][subpopulation]["observation"] += list1["category"]["subpopulation"]["observation"]
            resultCountsMap[category][subpopulation]["total"] += list1["category"]["subpopulation"]["total"]
        }
    }

    //gatherCounts for list2
    for(var index in list2){
        //json get
        var myJson = list2[index]
        var category = myJson["category"]
        var subpopulation = myJson["subpopulation"]
        if (!(category in resultCountsMap)){
            resultCountsMap[category] = {}
        }

        if (!(subpopulation in resultCountsMap[category])){
            resultCountsMap[category][subpopulation] = {
                "interview" : myJson = list2["category"]["subpopulation"]["interview"], 
                "observation" : myJson = list2["category"]["subpopulation"]["observation"], 
                "total" : myJson = list2["category"]["subpopulation"]["total"], 
            }

        }
        else{
            resultCountsMap[category][subpopulation]["interview"] += list2["category"]["subpopulation"]["interview"]
            resultCountsMap[category][subpopulation]["observation"] += list2["category"]["subpopulation"]["observation"]
            resultCountsMap[category][subpopulation]["total"] += list2["category"]["subpopulation"]["total"]
        }
    }

    console.log("RESULT MAP")
    console.log(resultCountsMap)



    return list1
}
