import React from 'react';

const NumberPercentage =  (props) => {
    let {data, height, subpopulation, header, hideInterview} = props

    const numerator = data[subpopulation].interview
    const denominator = data["Individuals"].interview

    return (
        <div style={{height:height}}>
            <div className = "component-header" style = {{fontSize: "24px"}}>
                 {((numerator/denominator*100)).toFixed()}%
            </div>
            <span className = "component-header">{header} </span>
            {props.hideInterview ? null : <h6 style = {{color: "#aaaaaa"}}>Interview Only</h6>}
        </div>
    )
}

export default NumberPercentage

