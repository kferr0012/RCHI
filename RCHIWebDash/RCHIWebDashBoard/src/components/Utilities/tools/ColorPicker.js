import React from 'react'
import { SliderPicker } from 'react-color';


const ColorPicker = (props) => (
    <SliderPicker
        color={ props.color}
        onChange ={props.changed}
      />
  )

  export default ColorPicker