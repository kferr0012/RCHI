import React from 'react'
import {Header,Segment} from 'semantic-ui-react'

const HeaderTrends= (props) => (
    <Segment>
        <Header as='h1'  textAlign='center'>
            Unsheltered Subpopulation Trends 2016-2020 [{props.currentPage}]
            <Header sub> 2020 Riverside County Pit Count</Header>
        </Header>
    </Segment>
  )
  
  export default HeaderTrends