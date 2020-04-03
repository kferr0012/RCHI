import React from 'react';

const NumberPercentage =  (props) => {
    let {data, height, subpopulation, header} = props

    const numerator = data[subpopulation].interview
    const denominator = data["Individuals"].interview

    return (
        <div style={{height:height}}>
            <div className = "component-header" style = {{fontSize: "24px"}}>
                 {((numerator/denominator*100)).toFixed()}%
            </div>
            <span className = "component-header">{header} </span>
            <h6 style = {{color: "#aaaaaa"}}>Interview Only</h6>
        </div>
    )
}

export default NumberPercentage

