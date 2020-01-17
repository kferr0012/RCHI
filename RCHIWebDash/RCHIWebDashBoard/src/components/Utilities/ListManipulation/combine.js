// combines two arrays omitting any objects with the same id
// function assumes no duplication of ids within a single array
export function combine ( array1, array2 ) {
    var ids = new Set([]);
    var cb = array1;
    for ( const x in array1 ) {
        ids.add(x.id);
    }
    for ( const x in array2 ) { 
        if ( !ids.has(x.id) ) {
            cb.push(x);
        }
    }
    return cb;
}