import React, { Component } from 'react';
import GraphRow from './EditableCharts_menu/GraphRow';
import RowMenu from './EditableCharts_menu/RowMenu';
import './EditableCharts.css';

export default class EditableCharts extends Component {

    constructor(){
        super()
        this.state = {
          graphrows: [
            [
              {
                GraphTitle: "This",
                GraphType: "Bar",
                Data: 1,
                idx: 0,
              },
              {
                GraphTitle: "Is",
                GraphType: "Line",
                Data: 2,
                idx: 1,
              },
              {
                GraphTitle: "All",
                GraphType: "Line",
                Data: 3,
                idx: 2,
              },
              {
                GraphTitle: "Randomly",
                GraphType: "Bar",
                Data: 3,
                idx: 3,
              },
            ],
            [
              {
                GraphTitle: "Generated",
                GraphType: "Bar",
                Data: 4,
                idx: 0,
              },
              {
                GraphTitle: "Data",
                GraphType: "Line",
                Data: 5,
                idx: 1,
              },
              {
                GraphTitle: "For",
                GraphType: "Bar",
                Data: 6,
                idx: 2,
              },
              {
                GraphTitle: "Testing",
                GraphType: "Line",
                Data: 1,
                idx: 3,
              },
            ],
            [
              {
                GraphTitle: "Purposes",
                GraphType: "Line",
                Data: 2,
                idx: 0,
              },
              {
                GraphTitle: "",
                GraphType: "Bar",
                Data: 1,
                idx: 1,
              },
              {
                GraphTitle: "",
                GraphType: "Line",
                Data: 3,
                idx: 2,
              },
              {
                GraphTitle: "",
                GraphType: "Bar",
                Data: 4,
                idx: 3,
              },
            ],
          ],
          graphs:[
            // {
            //   GraphTitle: "Graph0",
            //   GraphType: "",
            //   Data: 0,
            //   idx: 0,
            // },
          ],
          // graph: [
          //   {
          //     id: 0,
          //     title: 'Line',
          //     selected: false,
          //     key: 'graph'
          //   },
          //   {
          //     id: 1,
          //     title: 'Bar',
          //     selected: false,
          //     key: 'graph'
          //   }
          // ],
          datasets:[
            {
              labels: ['0','0','0'],
              datasets:[
                {
                  label: 'DEFAULT DATA',
                  data: [0,0,0]
                }
              ]
            },
            {
              labels: ['1','2','3'],
              datasets:[
                {
                  label: 'Numbers',
                  data: [1,2,3],
                  backgroundColor: '#003f5c',
                  borderColor: '#003f5c'
                }
              ]
            },
            {
              labels: ['3','2','1'],
              datasets:[
                  {
                    label: 'Numbers 2',
                    data: [3,2,1],
                    backgroundColor: '#003f5c',
                    borderColor: '#003f5c'
                  }
                ]
            },
            {
              labels: ['3','2','3'],
              datasets:[
                {
                  label: 'Numbers 3',
                  data: [3,2,3],
                  backgroundColor: '#ffa600',
                  borderColor: '#ffa600'
                }
              ]
            },
            {
              labels: ['2016','2017','2018','2019'],
              datasets:[
                {
                  label: 'Numbers 4',
                  data: [20,5,7,10],
                  backgroundColor: '#003f5c',
                  borderColor: '#003f5c'
                }
              ]
            },
            {
              labels: ['2016','2017','2018','2019'],
              datasets:[
                {
                  label: 'PIT',
                  data: [20,5,7,10],
                  backgroundColor: '#bc5090',
                  borderColor: '#bc5090'
                },
                {
                  label: 'HMIS',
                  data: [5,2,3,14],
                  backgroundColor: '#58508d',
                  borderColor: '#58508d'
                }
              ]
            },
            {
              labels: ['2016','2017','2018','2019'],
              datasets:[
                {
                  label: 'PIT',
                  data: [20,5,7,10],
                  backgroundColor: '#bc5090',
                  borderColor: '#bc5090'
                },
                {
                  label: 'HMIS',
                  data: [5,2,3,14],
                  backgroundColor: '#58508d',
                  borderColor: '#58508d'
                }
              ]
            },
          ],
          testArray:[
            {
              idx: 0,
              Title: "",
              data: 0
            }
          ]
        }
      }
    
      onGraphDataChange = (newVal,rowIDX,graphIDX) => {
        //console.log(idx);
        console.log(rowIDX);
        console.log(graphIDX);
        let graphcopy = [...this.state.graphrows];
        let temp1 = this.state.graphrows[rowIDX][graphIDX];
        console.log(temp1);
        let newitem = {
          ...temp1,
          ...newVal
        }
        console.log("new item: ");
        console.log(newitem);
        graphcopy[rowIDX][graphIDX] = newitem;
        if (graphcopy[rowIDX][graphIDX].Data < 0 || graphcopy[rowIDX][graphIDX].Data >= (this.state.datasets.length) || graphcopy[rowIDX][graphIDX].Data === "")
        {
          graphcopy[rowIDX][graphIDX].Data = 0;
        }
        this.setState({
          graphrows: graphcopy
        }
        );
      };
    
      handleAddChart = (rowIDX) => {
        var name = "Graph" + (Object.keys(this.state.graphrows[rowIDX]).length);
        console.log(this.state.datasets);
        let graphcopy = [...this.state.graphrows];
        let newitem = [
          ...this.state.graphrows[rowIDX],
          {
            GraphTitle: name,
            GraphType: "",
            Data: 0,
            idx: Object.keys(this.state.graphs).length
          }
        ]
        graphcopy[rowIDX] = newitem;
        this.setState({
          graphrows: graphcopy
        });
      };
    
      handleRemoveChart = (rowIDX, graphIDX) =>{
        var graphcopy = [...this.state.graphrows];
        graphcopy[rowIDX].splice(graphIDX,1);
        this.setState(
          {
            graphrows: graphcopy
          }
        );
      };
    
      handleAddRow = () => {
        this.setState({
          graphrows: 
            this.state.graphrows.concat([
              []
            ])
        });
      };
    
      handleRemoveRow = (rowIDX) => {
        var graphcopy = [...this.state.graphrows];
        graphcopy.splice(rowIDX,1);
        this.setState(
          {
            graphrows: graphcopy
          }
        );
      };
    
      render() {   
        var widgetHeight = (window.innerHeight * .3) - 30;
        var widgetWidth =  (window.innerWidth * .25) - 30;
        return (
            <div className = "container-fluid">
                <div className = "row">
                    <div className= "col-sm-3 menu">
                        <RowMenu
                        graphrows={this.state.graphrows}
                        graphs={this.state.graphs}
                        index={0} 
                        onChange={(fields,rowIDX,graphIDX)  => this.onGraphDataChange(fields,rowIDX,graphIDX)}
                        handleAddChart={ (rowIDX) => this.handleAddChart(rowIDX) }
                        handleAddRow = { () => this.handleAddRow()}
                        handleRemoveRow = { (rowIDX) => this.handleRemoveRow(rowIDX)}
                        handleRemoveChart = { (rowIDX,graphIDX) => this.handleRemoveChart(rowIDX,graphIDX)}
                        />          
                    </div>
                    <div className = "col-sm-6 report">
                        <br/>
                        <h2> My Report </h2>
                        {(this.state.graphrows).map((row,rowIDX)=>(
                            <GraphRow 
                            graphs = {this.state.graphrows[rowIDX]}
                            rowIDX = {rowIDX}
                            datasets = {this.state.datasets}
                            />
                        ))}
                        <br/>
                        {/* <p> {JSON.stringify(this.state.graphrows, null, 2) }</p>  */}
                    </div>

                    <div className= "col-sm-3 editreportinstructions">
                        <h1><br/>Editable Report Demo</h1>
                        <p>
                        <br/>
                        - Type values into the input sections on the left to edit graphs
                        <br/>
                        - Graphs are separated into rows
                        <br/>
                        - Make sure to type Bar or Line with a capital letter to start
                        <br/>
                        - Choose Test Data from 1-6
                        <br/>
                        - Add annother row of graphs, or Add Charts to the existing rows
                        <br/>
                        - Click the X to hide the menu
                        <br/>
                        - For the purpose of the Demo I loaded preexisting charts into the report though normally the Report would start empty
                        </p> 
                    </div>
                </div>
            </div>
        );
      }
    
}