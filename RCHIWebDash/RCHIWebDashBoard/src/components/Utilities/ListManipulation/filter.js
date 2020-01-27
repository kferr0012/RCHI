// filters a single dataArray
export function filter ( data, catergory, value ) {
    var newData = [];
    for ( const x in data ) {
        if ( x[catergory] != value ) {
            newData.push(x);
        }
    }
    return newData;
}