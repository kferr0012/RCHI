import React from 'react'
import {Line} from 'react-chartjs-2'

const LineChart =(props)  => (
    <div style={{height:'20em'}}> 
        <Line
            data={props.charData}
            options={{
                title: {
                    display:true,
                    text: props.title,
                    fontSize:15
                },
                legend:{
                    position:'bottom'
                },
                maintainAspectRatio:false,
            }}
            
        />
    </div>
)

export default LineChart