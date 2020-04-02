export const pitCountTrendMani = (data, id) => {

    const newDataObject = data.reduce((acc,val) => {
        let {total ,year} = val

        if(!acc[year]){
            acc[year] = {x: year, y: 0}
        }
        acc[year].y += total
        return acc; 
    },{})

    const newDataArray = [ {id:id ,data: Object.entries(newDataObject).map(([key,value]) => {
        return value
    })}]

    return newDataArray
}


export const LineCountInterviewMani = (data, lineID ,filterList) => {

    const filterData = filterFunction(data,filterList)

    const newDataObject = filterData.reduce((acc, val) => {
        let {interview, year} =val

        if(!acc[year]){
            acc[year] = {x:year, y:0}
        }
        acc[year].y += interview
        return acc;

    },{})

    const newDataArray = [ {id:lineID ,data: Object.entries(newDataObject).map(([key,value]) => {
        return value
    })}]

    return newDataArray
}

export const youthLineMani = (data, filterList) => {

    const filterData = filterFunction(data,filterList)

    const categories = ['Total', 'Interviewed', 'Observed']

    const newDataArray =categories.map( cat => {
        const data = filterData.map(val => {
            let {interview, observation, total, year} = val

            if(cat === 'Total'){
                return {
                    x : year,
                    y : total
                }
            }
            else if(cat === 'Interviewed'){
                return {
                    x : year,
                    y : interview
                }
            }
            else if(cat === 'Observed'){
                return {
                    x : year,
                    y : observation
                }
            }

        })

        return {id: cat, data: data}
    })

    return newDataArray

}

//* HelperFucntion

const filterFunction = (data,filterList) => {
    let {_typeFilter , yearFilter } = filterList

    return data.filter(index => {
        let {_type, year} = index

        return(
            _type === _typeFilter && year > yearFilter
        )
    })
}
