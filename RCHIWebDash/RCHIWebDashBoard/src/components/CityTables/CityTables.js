import React, { Component } from 'react';
import './CityTables.css'
import ReactToPrint from 'react-to-print';
import Select from 'react-select'
import axios from 'axios';
import { citynames, base, SubPopHeaders, Catergories, Titles ,filterData} from './constants';

import { Grid } from 'semantic-ui-react';
import { router } from '../Utilities/constants/routing'

export default class CityTables extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            curCities: ['RIVERSIDE'],
            households: {},
            year: 2020,
            citynames: "",
            selectOptions: []
          };

        this.state.citynames = citynames[2020];
    }

    componentWillMount() {
		/* 
			calls fetch data functions
		*/
        this.fetchSubpopulationData();
        this.fetchHouseholdData();

        var options = [];
        for (var i = 0; i < this.state.citynames.length; i++)
        {
            options.push({
                value: this.state.citynames[i],
                label: this.state.citynames[i]
            });
        }

        this.setState({
            selectOptions: options
        })
    }

    async fetchHouseholdData() {
        const promise = await axios.get(router.host+ '/' + router.root + '/' + router.activeYear + "/HouseholdsByCityYearInterview/");
        const indata = promise.status===200 ? promise.data: [];
        if (indata.length === 0){
            throw Error;
        }

        let data = {};

        const {citynames} = this.state;
        for (let i = 0; i < citynames.length ; i++)
        {
            data[citynames[i]] = { 
                'Total Households' :0,
                'Adults Only':0,
                'Children Only':0,	
                'Adults and Children':0
            }
        }

            indata.map(city => {
            data[city.city]= {
                'Total Households' : city.totalHouseholds,
                'Adults Only':city.adultsOnly,
                'Children Only':city.childrenOnly,	
                'Adults and Children':city.adultsAndChildren
            }
        })

        this.setState({
            households: data
        })
    }

    async fetchSubpopulationData() {
        const promise = await axios.get(router.host+ '/' + router.root + '/' + router.activeYear + "/SubpopulationsByCity/");
        const indata = promise.status===200 ? promise.data: [];
        if (indata.length === 0){
            throw Error("ERROR: indata length = 0");
        }

        var data = {};
        for (var i = 0; i < this.state.citynames.length ; i++)
        {
            data[this.state.citynames[i]] = JSON.parse(JSON.stringify(base));
        }

        for (var i = 0; i < indata.length ; i++)
        {   
            if(!filterData.includes(indata[i]['subpopulation'])){
                data[indata[i]['city']]['District'] = indata[i]['district'];
                data[indata[i]['city']][indata[i]['category']][indata[i]['subpopulation']]['Interview'] = indata[i]['interview'];
                data[indata[i]['city']][indata[i]['category']][indata[i]['subpopulation']]['Observation'] = indata[i]['observation'];
                data[indata[i]['city']][indata[i]['category']][indata[i]['subpopulation']]['Total'] = indata[i]['total'];
            }
            // break;
        }

        this.setState({
            data: data
        })
    }

    createTable = (incity) => {
        var curCity;
        var table = [];
        var tableRow = [];

        for (var x = 0; x < this.state.curCities.length && Object.keys(this.state.households).length > 0; x++)
        {
            curCity= this.state.curCities[x];
            tableRow  = [];
            var a = 0, curTot = 0, int = 0, obs = 0;
            if (Object.keys(this.state.data).length > 0)
            {
                console.log("Current City: ", this.state.data[curCity], " city: ", curCity)
            // creates table row then pushes to table
                for (var i = 0; i < 4; i++)
                {
                    tableRow = []
                    tableRow.push ( <th colspan="2" rowspan={Titles[Catergories[i]].length}> {Catergories[i]} </th> );
                    curTot = (  parseInt(this.state.data[curCity][Catergories[i]]['Total']['Observation'])
                                + parseInt(this.state.data[curCity][Catergories[i]]['Total']['Interview']));

                    for (var j = 0; j < Titles[Catergories[i]].length; j++)
                    {
                        int = parseInt(this.state.data[curCity][Catergories[i]][Titles[Catergories[i]][j]]['Interview']);
                        obs = parseInt(this.state.data[curCity][Catergories[i]][Titles[Catergories[i]][j]]['Observation']);

                        tableRow.push ( <td>{Titles[Catergories[i]][j]} </td>);
                        tableRow.push ( <td> {int} </td> );
                        tableRow.push ( <td> {obs} </td> );
                        tableRow.push ( <td> {int + obs} </td> );
                        tableRow.push ( <td> { Math.round( ( int + obs  ) / ( curTot )  * 100 ).toString() + '%' } </td> );
                        
                        if ( Titles[Catergories[i]][j] == 'Total')
                            table.push( <tr className="shaded"> {tableRow} </tr>);
                        else
                            table.push( <tr> {tableRow } </tr>);
                        tableRow = []
                        a+=1
                    }
                    
                    // tableRow.push ( <td> {this.state.data[i]['Catergory']} </td> );
                    a+=1
                }
                tableRow = []
                tableRow.push ( <th rowspan='53'> Subpopulations </th> );

                var intTot = 0;
                var obsTot = 0;
                for (var i = 0; i < SubPopHeaders.length; i++){
                    tableRow.push ( <th rowspan={Titles[SubPopHeaders[i]].length+1} > {SubPopHeaders[i]} </th> );
                    intTot = 0;
                    obsTot = 0;
                    for (var j = 0; j < Titles[SubPopHeaders[i]].length; j++){
                        int = parseInt(this.state.data[curCity]['Subpopulations'][Titles[SubPopHeaders[i]][j]]['Interview']);
                        obs = parseInt(this.state.data[curCity]['Subpopulations'][Titles[SubPopHeaders[i]][j]]['Observation']);
                        intTot+= int;
                        obsTot+= obs;
                        tableRow.push ( <td> {Titles[SubPopHeaders[i]][j]} </td> );
                        tableRow.push ( <td> {int} </td> );
                        tableRow.push ( <td> {obs} </td> );
                        tableRow.push ( <td> {int + obs} </td> );
                        tableRow.push ( <td> { Math.round( ( int + obs  ) / ( curTot )  * 100 ).toString() + '%' } </td> );
                        table.push( <tr> {tableRow } </tr>);
                        tableRow = []
                    }
                    tableRow.push ( <td> Total </td> );
                    tableRow.push ( <td> {intTot} </td> );
                    tableRow.push ( <td> {obsTot} </td> );
                    tableRow.push ( <td> {intTot + obsTot} </td> );
                    tableRow.push ( <td> {'100%' } </td> );
                    table.push( <tr className="shaded"> {tableRow} </tr>);
                    tableRow = []  
                }
                var intTotH = parseInt(this.state.households[curCity]['Total Households']);
                var h1 = parseInt(this.state.households[curCity]['Adults Only']);
                var h2 = parseInt(this.state.households[curCity]['Children Only']);
                var h3 = parseInt(this.state.households[curCity]['Adults and Children']);

                tableRow.push ( <th rowSpan="4">Interviewed Households</th> );

                //tableRow.push ( <th>Families with Children</th> );
                tableRow.push ( <td>Adults Only</td> );
                tableRow.push ( <td> {this.state.households[curCity]['Adults Only']} </td> );
                tableRow.push ( <td> {0} </td> );
                tableRow.push ( <td> {h1} </td> );
                tableRow.push ( <td> {Math.round( ( h1 ) / ( intTotH )  * 100 ).toString() + '%'  } </td> );
                table.push( <tr> {tableRow} </tr>);
                tableRow = []  

                //tableRow.push ( <th>Families with Children</th> );
                tableRow.push ( <td>Children Only</td> );
                tableRow.push ( <td> {this.state.households[curCity]['Children Only']} </td> );
                tableRow.push ( <td> {0} </td> );
                tableRow.push ( <td> {h2} </td> );
                tableRow.push ( <td> {Math.round( ( h2 ) / ( intTotH )  * 100 ).toString() + '%'  } </td> );
                table.push( <tr> {tableRow} </tr>);
                tableRow = []  

                //tableRow.push ( <th>Families with Children</th> );
                tableRow.push ( <td>Families with Children</td> );
                tableRow.push ( <td> {this.state.households[curCity]['Adults and Children']} </td> );
                tableRow.push ( <td> {0} </td> );
                tableRow.push ( <td> {h3} </td> );
                tableRow.push ( <td> {Math.round( ( h3 ) / ( intTotH )  * 100 ).toString() + '%'  } </td> );
                table.push( <tr> {tableRow} </tr>);
                tableRow = []  
                
                tableRow.push ( <td>Total</td> );
                tableRow.push ( <td> {intTotH} </td> );
                tableRow.push ( <td> {0} </td> );
                tableRow.push ( <td> {intTotH} </td> );
                tableRow.push ( <td> {'100%' } </td> );
                table.push( <tr className="shaded"> {tableRow} </tr>);
                tableRow = []  

                tableRow.push ( <th colspan="3"> Total Unsheltered Homeless Individuals</th> );
                tableRow.push ( <td> {intTot} </td> );
                tableRow.push ( <td> {obsTot} </td> );
                tableRow.push ( <td> {intTot + obsTot} </td> );
                tableRow.push ( <td> {'100%' } </td> );
                table.push( <tr className="shaded"> {tableRow} </tr>);
                tableRow = []  
            }
        }
        return table;
    }
    render(){
        return(
            <Grid container>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Select options={this.state.selectOptions} onChange={ (value) => {if (value.value.length > 2) { 
                            this.setState({curCities: [value.value]}); } } } />
                        <br/>
                        <ReactToPrint
                            trigger={() => <button href="#">Print Table</button>}
                            content={() => this.componentRef}
                        />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <table ref={el => (this.componentRef = el)} className="paperSize" key={Math.random()}>
                            {/* <caption>*percents for subpopulations are taken from totals within each catergory (i.e. Veterans/ Total Veterans in City)</caption> */}
                            <thead>
                                <tr>
                                <th id="TableTitle" colspan="7">The Subpopulations of {this.state.curCities}</th>
                                </tr>
                                <tr>
                                    <th colspan="2">Catergory</th>
                                    <th>Response Options</th>
                                    <th>Interview</th>  
                                    <th>Observation</th>
                                    <th>Total Count</th>  
                                    <th>Percent</th>                 
                                </tr>
                            </thead>
                            <tbody>
                                {this.createTable(this.state.curCities[0])}
                            </tbody>
                        </table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}