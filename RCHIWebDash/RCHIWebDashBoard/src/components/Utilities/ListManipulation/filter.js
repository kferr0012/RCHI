// filters a single dataArray

function contains(dataRow, category, valueList){
    for (var i = 0 ;  i< valueList.length;i++){
        if(dataRow[category] == valueList[i]){
            return true
        }
    }
    return false
}

export function filter ( data, catergory, value ) {
    console.log("filter")
    var newData = [];
    
    for ( const x in data ) {
        if ( data[x][catergory] != value ) {
            newData.push(data[x]);
        }
    }

    console.log("newData")
    console.log(newData)
    return newData;
}

export function filterList (data, category, valueList){
    
    var newData = []
    console.log("filterList")
    for(var i = 0 ; i < data.length;i++){
        
        if (!contains(data[i], category,valueList)){
            newData.push(data[i])
        }
    }
    return newData
}
export function subset(data, category, valueList){
    var newData = []
    for ( const x in data ) {

        if ( x[category] == valueList ) {
            newData.push(data[x]);
        }
    }
    return newData;
}