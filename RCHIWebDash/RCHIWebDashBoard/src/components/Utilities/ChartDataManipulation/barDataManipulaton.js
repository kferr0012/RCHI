export const shelteredVsUnshelteredMani =(data, keys) => {

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

export const barByYearMani = (data, filterList) => {
    
    const filterData = filterFunction(data, filterList)

    const newDataObject = filterData.reduce((acc, val) => {
        let {total, year} = val

        if(!acc[year]){
            acc[year] = {total:total}
        }

        return acc
    }, {})

    const newDataArray = Object.entries(newDataObject).map(([key,value])=>{
        return {
            year:key,
            ...value
        }
    })
    
    return newDataArray
}


//* Helper Function 

const filterFunction = (data,filterList) => {
    let {_typeFilter , yearFilter } = filterList

    return data.filter(index => {
        let {_type, year} = index

        return(
            _type === _typeFilter && year > yearFilter
        )
    })
}