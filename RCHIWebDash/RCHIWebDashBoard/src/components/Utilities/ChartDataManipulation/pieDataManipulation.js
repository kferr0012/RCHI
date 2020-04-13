export const pieDataManiTotal = (data,percentage=null) => {

    if(percentage != null){
        return otherFilter(data, percentage)
    }
    else{
        const newDataArray =data.map(val => {
            let {subpopulation, total} = val
    
            return {
                id: subpopulation,
                label: subpopulation,
                value: total
            } 
        })  
        return newDataArray
    }
}

export const pieDataManiInterview =(data, percentage=null) => {
    
    if(percentage != null){
        return otherFilter(data.map(val => { const total = val.interview
             return {...val,total}}), percentage)
    }
    else{
        const newDataArray =data.map(val => {
            let {subpopulation, interview} = val
    
            return {
                id: subpopulation,
                label: subpopulation,
                value: interview
            } 
        })
    
        return newDataArray
    }
}


const otherFilter = (data, percentage) => {
    const totalCount = data.reduce((acc, val) => acc + val.total,0)

    const newDataObject = data.reduce((acc, val) => {
        let {subpopulation, total} = val

        var key = subpopulation

        if((total/totalCount) < percentage){
            key = "Other"
        }

        if(!acc[key]){
            acc[key] = { id: key, label: key, value:0}
        }
        acc[key].value += total

        return acc
    }, {})
    return Object.entries(newDataObject).map(([key, val]) => val)
}
