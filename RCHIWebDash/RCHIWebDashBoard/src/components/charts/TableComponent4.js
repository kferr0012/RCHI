import React, {Component} from 'react';
import { Header, Table} from 'semantic-ui-react';
import '../css/table.css';

class TableComponent4 extends Component{
  constructor(props){
    super(props);

    this.state = {
      chartData : null,
      column_name_array: [],
      filteredData: [],
      flag: false,
      col_size : null,
      body_function : null,
      test_function : null,
      mystyle : null,
      expand_i: this.props.expandIndex,
      color: "red",
      tableFillColor: "#f1f1f1",
      percent_flag : this.props.percentage_flag,
      individuals_row : this.props.individuals_row
    }

    //console.log(this.props.expandIndex);
    //console.log(this.state)
  }

  componentWillReceiveProps(){
    this.componentDidMount();
  }

  componentDidMount(){
    //Arrange Data

    this.state.chartData = this.props.data;

    //console.log(this.state.expand_i);
    var local_expand_index = this.state.expand_i

    var label_array = [];
    var unpopulated_array = [];
    var column_name_array = [];
    var column_size = 0;

    //This portion is creates a new column of percentages
    //Built specifically for the Living Situations Table in The General DashBoard
    if(this.state.percent_flag != null){

      //1)Create a new array with percentages
      //2)Merge new array with the original array
      //3)Reassign the data with the merged array

      if(this.state.individuals_row != null){
        console.log('Individuals row passed')
      }

      //Grab Total
      var total = 0

      if(this.state.individuals_row != null){
        for(let i = 0; i < this.state.chartData.length; ++i){
          if(this.state.chartData[i].subpopulation =='Individuals'){
            total = this.state.chartData[i].total
            this.state.chartData.splice(i,1)
          }
        }
      }
      else{
        //Grab the totals of the whole array of JSONS
        for(let i = 0; i < this.state.chartData.length; ++i){
          if(this.state.chartData[i].subpopulation != 'Total')
            total+=this.state.chartData[i].total
        }
      }

      //Initialize second array
      var new_array = []

      //Calculate Percentage
      for(let k = 0; k < this.state.chartData.length; ++k){
        let percent_val = this.state.chartData[k].total/total

        //Truncates percent
        percent_val = Math.floor(percent_val*100)

        //Converts to string
        let percent_str = percent_val.toString()

        percent_str = percent_str.concat('%')

        if(percent_str == '0%'){
          percent_str = '<1%'
        }

        //Construct new JSONS
        //Add new JSONS to the new array
        var new_key_name = 'percentage'
        var new_key_value = percent_str

        var new_json={}

        new_json['id'] = k.toString()
        new_json['total']= percent_str
        new_json['_type']= 'z'
        new_json['category']= "Living Situations"
        new_json['subpopulation']=this.state.chartData[k].subpopulation

        new_array.push(new_json)
      }

      var original_array = this.state.chartData

      //Merge the two arrays
      var merged_array = original_array.concat(new_array)

      //Reassign state
      this.state.chartData = merged_array
    }

    //find all the columns
    //CONDITIONAL
    //Check if expandIndex prop passed
    //console.log("Checking expand_i")
    // //console.log(this.state.expand_i);
    var local_expand_i = this.state.expand_i;
    if(this.state.expand_i != null){
      for(let i = 0; i < this.state.chartData.length; ++i){
        //console.log(this.state.chartData[i][local_expand_i]);
        if(!column_name_array.includes(this.state.chartData[i][local_expand_i])){
          //console.log("Checking if expandIndex found the correct columns.")
          //console.log(this.state.chartData[i][local_expand_i])
          column_name_array.push(this.state.chartData[i][local_expand_i]);
        }
      }
    }
    else{
      for(let i = 0; i < this.state.chartData.length; ++i){
        if(!column_name_array.includes(this.state.chartData[i].category)){
          //console.log("Checking if category found the correct columns.")
          //console.log(this.state.chartData[i].category)
          column_name_array.push(this.state.chartData[i].category);
        }
      }
    }


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
        "0": label_array[i] //This is the rowName, because of reordering,this must be set to 0 to handle columns that are numbers
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

    //Populate the unpopulated array
    //CONDITIONAL
    //check if expandIndex prop is passed in
    if(this.state.expand_i != null){
      for(let i = 0; i < unpopulated_array.length; ++i){
        for(let k = 0; k < this.state.chartData.length; ++k){
          if(unpopulated_array[i]["0"] == this.state.chartData[k].subpopulation){
            unpopulated_array[i][this.state.chartData[k][this.state.expand_i]] = this.state.chartData[k].total;
          }
        }
      }
    }
    else{
      for(let i = 0; i < unpopulated_array.length; ++i){
        for(let k = 0; k < this.state.chartData.length; ++k){
          if(unpopulated_array[i]["0"] == this.state.chartData[k].subpopulation){
            unpopulated_array[i][this.state.chartData[k].category] = this.state.chartData[k].total;
          }
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



    this.state.filteredData = unpopulated_array;

    var builder_function = function(it){


      Object.keys(it).map((sub_iterator,sub_idx)=>{
        //console.log(sub_iterator)
        //console.log(it[sub_iterator])
        return(
          <Table.HeaderCell>{it[sub_iterator]}</Table.HeaderCell>
        );
      })
    }

    var builder_function2 = function(it){



      var value_array = []

      for(var val in it){
        value_array.push(it[val]);
      }


      return(
            value_array.map((iterator,idx)=>{
              return(
                <Table.HeaderCell textAlign='center' width='10000'>{iterator}</Table.HeaderCell>
              )
            })
      )
    }

    //Styling
    var my_style = {
      width: this.props.width,
      // padding: "30px",
      // margin: "auto",
      height: "100%"
    }


    this.setState(
      {
        column_name_array: column_name_array,
        filteredData: unpopulated_array,
        flag : true,
        col_size : column_size,
        body_function : builder_function,
        test_function : builder_function2,
        mystyle : my_style
      }
    );

    //console.log(this.state.filteredData);
  }




  render(){

    if(!this.state.flag){
      return(<h3>Loading</h3>);
    }
    else{
    return(
      <div className="tableContainer" style = {{...this.state.mystyle, height: this.props.divHeight ? this.props.divHeight: '100%', width: "100%", padding: 0, position: this.props.position ? this.props.position : ''}}>
            <Table Cell Structured unstackable style={{ borderWidth: "1px", height: this.props.tableHeight ? this.props.tableHeight : "80%"}}>
              <Table.Header>

                {this.props.tableName ?
                <Table.Row>
                  <Table.HeaderCell colSpan={this.state.col_size+1} textAlign='center'>
                    <Header>
                      {this.props.tableName}
                      <Header.Subheader/>
                    </Header>
                  </Table.HeaderCell>
                </Table.Row>
                :null
                }

                {this.props.header ?

                <Table.Row>
                <Table.HeaderCell textAlign='center'>         </Table.HeaderCell>

                  {
                    this.state.column_name_array.map( (iterator, idx)=>{
                        return(
                            <Table.HeaderCell textAlign='center'>{iterator}</Table.HeaderCell>
                        );
                    })
                  }

                </Table.Row>


                :
                null
                }
                </Table.Header>

              <Table.Body>
                {/*console.log(this.state.filteredData)*/}
                {
                  this.state.filteredData.map((iterator,idx)=>{
                    if(idx%2==1){
                      return(
                          <Table.Row>
                            {
                              this.state.test_function(iterator)
                            }
                          </Table.Row>
                      )
                    }
                    else{
                      return(
                          <Table.Row bgcolor={this.state.tableFillColor}>
                            {
                              this.state.test_function(iterator)
                            }
                          </Table.Row>
                      )
                    }
                  })
                }
              </Table.Body>
            </Table>
      </div>
    )
  }
  }
}



export default TableComponent4
