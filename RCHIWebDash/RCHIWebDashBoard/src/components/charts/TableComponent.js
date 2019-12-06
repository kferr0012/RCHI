import React, {Component} from 'react';
import { Header, Table} from 'semantic-ui-react';

class TableComponent extends Component{
  constructor(){
    super();

    this.state = {
      chartData : null,
      year1 : null,
      year2 : null,
      filteredData: [],
      body: null,
      flag: false
    }
  }





  componentDidMount(){
    //Arrange Data

    this.state.chartData = this.props.data;
    this.state.year1 = this.props.year1;
    this.state.year2 = this.props.year2;


    // for(let i  = 0; i < this.state.chartData.length; ++i){
    //   console.log(this.state.chartData[i]);
    // }

    var label_array = [];
    var unpopulated_array = [];

    //fill label_array
    for(let i = 0; i < this.state.chartData.length; ++i){
      if(!label_array.includes(this.state.chartData[i].subpopulation)){
        label_array.push(this.state.chartData[i].subpopulation);
      }
    }

    //fill unpopulated_array
    for(let i = 0; i < label_array.length; ++i){
      var temp = {
        "rowName": label_array[i],
        "value1": -1,
        "value2": -2
      }
      unpopulated_array.push(temp);
    }

    // for(let i = 0; i < unpopulated_array.length; ++i){
    //   console.log(unpopulated_array[i]);
    // }

    //If year1 is lower
    if(this.state.year1 < this.state.year2){
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
    }


    // for(let i = 0; i < unpopulated_array.length; ++i){
    //   console.log(unpopulated_array[i]);
    // }

    this.state.filteredData = unpopulated_array;


    this.setState(
      {
        year1 : this.props.year1,
        year2 : this.props.year2,
        filteredData: unpopulated_array,
        flag : true
      }
    );
    // console.log(this.state.filteredData);
  }

  render(){
    if(!this.state.flag){
      return(<h3>Loading</h3>);
    }
    else{
    return(
      <div>
        <Table Cell Structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3' textAlign='center'>
                <Header>
                  {this.props.tableName}
                  <Header.Subheader/>
                </Header>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign='center'></Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{this.state.year1}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{this.state.year2}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.state.filteredData.map( (iterator, idx)=>{
                  return(
                    <Table.Row>
                      <Table.HeaderCell textAlign='center'>{this.state.filteredData[idx].rowName}</Table.HeaderCell>
                      <Table.HeaderCell textAlign='center'>{this.state.filteredData[idx].value1}</Table.HeaderCell>
                      <Table.HeaderCell textAlign='center'>{this.state.filteredData[idx].value2}</Table.HeaderCell>
                    </Table.Row>
                  );
              })
            }
          </Table.Body>

        </Table>
      </div>
    )
  }
  }
}


export default TableComponent
