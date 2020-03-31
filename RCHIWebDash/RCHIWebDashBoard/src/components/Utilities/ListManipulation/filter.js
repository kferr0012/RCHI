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
    var newData = [];
    
    for ( const x in data ) {
        if ( data[x][catergory] != value ) {
            newData.push(data[x]);
        }
    }

    console.log(newData)
    return newData;
}

export function filterList (data, category, valueList){
    
    
    var newData = []

    for(var i = 0 ; i < data.length;i++){
        
        if (!contains(data[i], category,valueList)){
            newData.push(data[i])
        }
    }
    return newData
}
export function subset(data, category, valueList){
    var newData = []
    for ( var x = 0; x < data.length; x++  ) {

        if ( data[x][category] == valueList ) {
            newData.push(data[x]);
        }
    }
    return newData;
}

// remove all entried when the category equals value from a list
export function remove ( data, category, value ) {
    var newData = [];
    for ( var x = 0; x < data.length; x++ ) {
        if ( data[x][category] != value ) {
            newData.push(data[x]);
        }
    }
    return newData;
}


export const stackBarGraph =(data, keys) => {
    console.log("KEYS: ", keys)

    const newDataObject = data.reduce((acc,val) => {
        let {subpopulation, total, _type} = val

        if(!acc[subpopulation]){
            acc[subpopulation] = { [_type]: total}
        }
        else{
            acc[subpopulation] = {...acc[subpopulation], [_type]:total }
        }
        return acc
    }, {})

    const newDataArray = Object.entries(newDataObject).map(([key,value]) => {
        console.log("KEY: ", key)
        console.log("Value: ", value)
        let {Unsheltered, Sheltered} = value
        console.log("Type: ", typeof(Unsheltered))
        console.log("UNSHELTERRED: ", Unsheltered)
        return{
            subpopulation: key,
            Unsheltered: Unsheltered,
            Sheltered : Sheltered
        }
    })

    console.log("NEW DATA ARRAY: ", newDataArray)



    return newDataArray
}