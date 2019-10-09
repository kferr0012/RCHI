import React from 'react'
import {Grid,Segment} from 'semantic-ui-react'



    // columnHandler = (size) => {
    //     const columns  = []
    //         for(var i =0; i<size; i++){
    //            columns.push( <Grid.Column>
    //                 <Segment> {i}</Segment>
    //             </Grid.Column>)
    //         }

    //     return columns
    // }


const TrendLayout= (props) => (
    
    <Grid>
        <Grid.Row columns={2} stretched>
            {/* {this.columnHandler(props.layoutSize.row1)} */}
        </Grid.Row>

        <Grid.Row columns={3} stretched>
            
        </Grid.Row>
    </Grid>
  )
  
  export default TrendLayout