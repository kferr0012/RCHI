import React from 'react'
import {Header,Segment} from 'semantic-ui-react'

const HeaderDistricts= (props) => (
    <Segment>
        <Header size="huge"  textAlign='center'>
            Unsheltered - Supervisory District {props.currentPage}
            <Header sub> 2019 Riverside County Pit Count</Header>
        </Header>
    </Segment>
  )
  
  export default HeaderDistricts