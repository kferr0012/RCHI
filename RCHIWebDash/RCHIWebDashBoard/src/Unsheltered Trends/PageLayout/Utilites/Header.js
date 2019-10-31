import React from 'react'
import {Header,Segment} from 'semantic-ui-react'

const HeaderTrends= (props) => (
    <Segment>
        <Header as='h1'  textAlign='center'>
            Unsheltered Subpopulation Trends 2015-2019 [{props.currentPage}]
            <Header sub> 2019 Riverside County Pit Count</Header>
        </Header>
    </Segment>
  )
  
  export default HeaderTrends