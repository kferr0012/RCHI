import React from 'react';

const TotalGeneral = (props) => {
    let {data, height, subpopulation, header} = props

    const totalUnsheltered = data[subpopulation].total

    return(
        <div style = {{height: {height}}}>
            <div>
            {totalUnsheltered}
            </div>
        </div>
    )
}

export default TotalGeneral
