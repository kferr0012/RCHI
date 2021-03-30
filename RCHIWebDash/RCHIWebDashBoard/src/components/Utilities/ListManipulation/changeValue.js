/**
 *  @param {Object} array - data to change
 *  @param {Object} id - list of column to change, for example "subpopulation"
 *  @param {Object} vals - list of old column names, for example "Seniors 60+"
 *  @param {Object} newval - list of new column names, for example "Seniors (>= 60)"
 *  changes map[id] in array from val to new val
 *  */
export function changeVal( array, id , val, newval ) {
    return array.map( ( map ) => {
        if ( map[id] === val )
            map[id] = newval
        return map
    })
}

// changes map[id] in array from val to new val for all ids, vals
// ids, vals, newvals must all be same length
export function changeVals( array, ids , vals, newvals ) {
    let map = array;
    for ( let i = 0; i < ids.length; i++){
        map = changeVal( map, ids[i], vals[i], newvals[i])
    }
    return map
}

export function changeVals2020( array ) {
    return changeVals( array , 
        [
            "subpopulation",
            "subpopulation",
            "subpopulation",
            "subpopulation",
            "subpopulation",
            "subpopulation",
            "subpopulation",
            "subpopulation",
        ], 
        [
            "Adults (>24)",
            "Children (<18)",
            "Seniors 60+",
            "Unknown Age",
            "Veterans Yes",
            "Veteran Yes",
            "Gender Non-Conforming",
            "Unknown Ethncity",
            "Seniors 60+"
        ], 
        [
            "Adults (≥25)",
            "Children (≤17)",
            "Seniors (≥60)",
            "Unknown Ages",
            "Veterans",
            "Veterans",
            "Gender Non-Con",
            "Unknown Hispanic",
        ]
    )
}