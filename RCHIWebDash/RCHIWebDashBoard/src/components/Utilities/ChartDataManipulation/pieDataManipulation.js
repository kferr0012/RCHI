export const pieDataManiTotal = data => {
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

export const pieDataManiInterview = data => {

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