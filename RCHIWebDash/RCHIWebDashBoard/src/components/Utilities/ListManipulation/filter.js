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
        let {Unsheltered, Sheltered} = value

        return{
            subpopulation: key,
            Unsheltered: Unsheltered,
            Sheltered : Sheltered
        }
    })

    return newDataArray
}


export const NumberCreator = (data) => {

    
    const filterKeys = ["Individuals", "PTSD", "Mental Health Conditions", "Substance Abuse","Physical Disability"]

    const filterData = data.filter( (val) => {
        let {subpopulation} = val

        return (filterKeys.includes(subpopulation))
    })

    const newDataObject = filterData.reduce ((acc,val)=> {
        let {subpopulation,interview, observation, total} = val
        if(!acc[subpopulation]){
            acc[subpopulation] = {interview:interview, observation:observation,total:total}
        }

        return acc
    },{})

    return newDataObject
}

export function orderSubs( data, order, cols ){
    let ordered = new Array(order.length*cols);
    let k = 0;
    for (let i = 0; i < order.length; i++){
        for (let j = 0; j < data.length; j++){
            if (data[j]["subpopulation"] === order[i]){
                ordered[k] = data[j];
                k++;
            }
        }
    }
    console.log(data)
    console.log(ordered)
    return ordered;
}