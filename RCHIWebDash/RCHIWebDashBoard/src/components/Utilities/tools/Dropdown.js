import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const TrendOptions =[
    {key: 'HIV/AIDS', value:  'AIDS or HIV', text:'HIV/AIDS' },
    {key: 'Mental Health', value : 'Mental Health Conditions', text:'Mental Health' },
    {key: 'PTSD', value : 'PTSD', text:'PTSD' },
    {key: 'Brain Injury', value : 'Brain Injury', text:'Brain Injury' },
    {key: 'Youth (18-24)', value : 'Youth (18-24)', text:'Youth (18-24)' },
    {key: 'Veterans', value:  'Veteran', text:'Veterans' },
    {key: 'Chronically Homeless', value : 'Chronically Homeless', text:'Chronically Homeless' },
    {key: 'Families with Children', value : 'Families with Children', text:'Families with Children' },
    {key: 'Elderly (>=62)', value : 'Elderly (>62)', text:'Elderly (>=62)' },
    {key: 'Substance Abuse', value : 'Abuse', text:'Substance Abuse' },
    {key: 'Victims of Domestic Violence', value : 'Victim of Domestic Violence', text:'Victims of Domestic Violence' },
    {key: 'Incarceration', value : 'Jail Release 12 Months', text:'Incarceration' },
]

const DropdownTrendsClearableMultiple = (props) => (
    <Dropdown
        clearable
        selection
        fluid
        multiple
        search
        options ={TrendOptions}
        placeholder = 'Select Trend'
        onChange ={props.changed}
    />
  )

  export default DropdownTrendsClearableMultiple
