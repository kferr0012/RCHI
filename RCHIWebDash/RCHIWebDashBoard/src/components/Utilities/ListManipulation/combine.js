// combines two arrays omitting any objects with the same id
// function assumes no duplication of ids within a single array
export function combine ( array1, array2 ) {
    var ids = new Set([]);
    var cb = array1;
    for ( var x = 0; x < array1.length; x++ ) {
        ids.add(array1[x].id);
    }
    for ( var x = 0; x < array2.length; x++ ) {
        if ( !ids.has(array2[x].id) ) {
            cb.push(array2[x]);
        }
    }
    return cb;
}
