// from a list get all values whose category equals the value
export function get ( data, category, value ) {
    var newData = [];
    for ( var x = 0; x < data.length; x++ ) {
        if ( data[x][category] == value ) {
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
