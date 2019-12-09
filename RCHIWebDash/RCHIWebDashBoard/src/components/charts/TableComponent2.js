import React, {Component} from 'react';
import { Header, Table} from 'semantic-ui-react';

class TableComponent2 extends Component{
  constructor(){
    super();

    this.state = {
      chartData : null,
      type_array: [],
      filteredData: [],
      flag: false,
      col_size : null
    }
  }





  componentDidMount(){
    //Arrange Data

    this.state.chartData = this.props.data;


    // for(let i  = 0; i < this.state.chartData.length; ++i){
    //   console.log(this.state.chartData[i]);
    // }

    var label_array = [];
    var unpopulated_array = [];
    var column_name_array = [];
    var column_size = 0;


    //find all the columns
    for(let i = 0; i < this.state.chartData.length; ++i){
      if(!column_name_array.includes(this.state.chartData[i].type)){
        console.log(this.state.chartData[i].type);
        column_name_array.push(this.state.chartData[i].type);
      }
    }

    console.log(column_name_array);

    column_size = column_name_array.length;

    //fill label_array
    for(let i = 0; i < this.state.chartData.length; ++i){
      if(!label_array.includes(this.state.chartData[i].subpopulation)){
        label_array.push(this.state.chartData[i].subpopulation);
      }
    }

    //fill unpopulated_array
    for(let i = 0; i < label_array.length; ++i){
      var temp = {
        "rowName": label_array[i]
      }
      unpopulated_array.push(temp);
    }

    //dynamically allocate slots
    for(let i = 0; i < unpopulated_array.length; ++i){
      for(let k = 0; k < label_array.length; ++k){
        var slot_name = label_array[k];

        unpopulated_array[i][slot_name] = -1;
      }
    }

    //dynamically clean slots

    // for(let i = 0; i < unpopulated_array.length; ++i){
    //   console.log(unpopulated_array[i]);
    // }


/*
    //populate unpopulated_arrays
    for(let i = 0; i < this.state.chartData.length; ++i){
      //check if in list1
      if(label_array.includes(this.state.chartData[i].subpopulation)){
        //find it in list2

        for(let j = 0; j < unpopulated_array.length; ++j){
          if(this.state.chartData[i].subpopulation == unpopulated_array[j].rowName){
            //check year
            if(this.state.chartData[i].year == this.state.year1){
              unpopulated_array[j].value1 = this.state.chartData[i].total;
            }
            else if(this.state.chartData[i].year == this.state.year2){
              unpopulated_array[j].value2 = this.state.chartData[i].total;
            }
          }
        }
      }
    }
  */

    //Populate the unpopulated array
    for(let i = 0; i < unpopulated_array.length; ++i){
      for(let k = 0; k < this.state.chartData.length; ++k){
        if(unpopulated_array[i].rowName == this.state.chartData[k].subpopulation){
          unpopulated_array[i][this.state.chartData[k].type] = this.state.chartData[k].total;
        }
      }
    }

    //Clean out the now populated array
    for(let i = 0; i < unpopulated_array.length; ++i){
      for(var key in unpopulated_array[i]){
        if(unpopulated_array[i][key] == -1){
          delete unpopulated_array[i][key];
        }
      }
    }


    // for(let i = 0; i < unpopulated_array.length; ++i){
    //   console.log(unpopulated_array[i]);
    // }

    this.state.filteredData = unpopulated_array;


    this.setState(
      {
        type_array: column_name_array,
        filteredData: unpopulated_array,
        flag : true,
        col_size : column_size
      }
    );


  }

  render(){
    if(!this.state.flag){
      return(<h3>Loading</h3>);
    }
    else{
    return(
      <div style = {{width: this.props.width}}>
        <Table Cell Structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={this.state.col_size+1} textAlign='center'>
                <Header>
                  {this.props.tableName}
                  <Header.Subheader/>
                </Header>
              </Table.HeaderCell>
            </Table.Row>

            {console.log(this.state)}

            <Table.Row>
            <Table.HeaderCell textAlign='center'>         </Table.HeaderCell>
            {
              this.state.type_array.map( (iterator, idx)=>{
                  return(
                      <Table.HeaderCell textAlign='center'>{iterator}</Table.HeaderCell>
                  );
              })
            }

            </Table.Row>
          </Table.Header>

          <Table.Body>

          </Table.Body>

        </Table>
      </div>
    )
  }
  }
}


export default TableComponent2
