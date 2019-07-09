import React, { Component } from 'react';
import './CityTables.css'
import Papa from 'papaparse'
import ReactToPrint from 'react-to-print';
import Select from 'react-select'

export default class CityTables extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            curCities: ['RIVERSIDE'],
            dataNum: 0,
            households: {},
            citynames: [
                'BANNING',				
                'BEAUMONT',
                'BLYTHE',
                'CALIMESA',
                'CATHEDRAL CITY',
                'COACHELLA',
                'CORONA',
                'DESERT HOT SPRINGS',
                'HEMET',
                'INDIAN WELLS',
                'INDIO',
                'JURUPA VALLEY',
                'LA QUINTA',
                'LAKE ELSINORE',
                'MENIFEE',
                'MORENO VALLEY',
                'MURRIETA',
                'NORCO',
                'PALM DESERT',
                'PALM SPRINGS',
                'PERRIS',
                'RANCHO MIRAGE',
                'RIVERSIDE',
                'RIVERSIDE 2',
                'RIVERSIDE 1',
                'SAN JACINTO',
                'TEMECULA',
                'WILDOMAR',
                'UNINCORPORATED 1',
                'UNINCORPORATED 2',
                'UNINCORPORATED 3',
                'UNINCORPORATED 4',
                'UNINCORPORATED 5',
            ],
            selectOptions: []
          };
        this.updateData = this.updateData.bind(this);
        this.updateHouseholdData = this.updateHouseholdData.bind(this);
        this.createTable = this.createTable.bind(this);
    }
    componentWillMount() {
		/* 
			When its determined that the component will mount this parses all the csvs needed for the Supervisorial Districts and places them into state
		*/
        var csvFilePath = require("./2019citySubPopulations.csv");
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.updateData
        });

        csvFilePath = require("./2019_cityHouseholds_modified.csv");
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: this.updateHouseholdData
        });

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

    updateHouseholdData(csvData){
        const indata = csvData.data;
        var data = {};
        //console.log(indata);
        for (var i = 0; i < this.state.citynames.length ; i++)
        {
            data[this.state.citynames[i]] = { 
                'Total Households' :0,
                'Adults Only':0,
                'Children Only':0,	
                'Adults and Children':0
            }
        }
        for (var i = 0; i < indata.length ; i++)
        {
            //console.log(indata[i])
            data[indata[i]['City']]['Total Households'] = indata[i]['Total Households'];
            data[indata[i]['City']]['Adults Only'] = indata[i]['Adults Only'];
            data[indata[i]['City']]['Children Only'] = indata[i]['Children Only'];
            data[indata[i]['City']]['Adults and Children'] = indata[i]['Adults and Children'];
            
        }
        this.setState({
            households: data
        })
    }

    updateData(csvData) {
        const indata = csvData.data;
        var data = {};
        for (var i = 0; i < this.state.citynames.length ; i++)
        {
            data[this.state.citynames[i]] = {
                'District': 0,
                'Age':	{
                    'Youth (18-24)': { 'Interview':0, 'Observation':0 },
                    'Children (<18)': { 'Interview':0, 'Observation':0 },
                    'Adults (>24)': { 'Interview':0, 'Observation':0 },
                    //'Elderly (62+)': { 'Interview':0, 'Observation':0 },
                    'Unknown Age': { 'Interview':0, 'Observation':0 },
                    'Total': { 'Interview':0, 'Observation':0 },
                },
                'Race':	{
                    'Asian': { 'Interview':0, 'Observation':0 },
                    'Black': { 'Interview':0, 'Observation':0 },
                    'White': { 'Interview':0, 'Observation':0 },
                    'American Indian': { 'Interview':0, 'Observation':0 },
                    'Native Hawaiian': { 'Interview':0, 'Observation':0 },
                    'Multiple Races': { 'Interview':0, 'Observation':0 },
                    'Unknown Race': { 'Interview':0, 'Observation':0 },
                    'Total': { 'Interview':0, 'Observation':0 },
                },
                'Ethinicity':	{
                    'Hispanic': { 'Interview':0, 'Observation':0 },
                    'NonHispanic': { 'Interview':0, 'Observation':0 },
                    'Unknown Ethinicity': { 'Interview':0, 'Observation':0 },
                    'Total': { 'Interview':0, 'Observation':0 },
                },
                'Gender':	{
                    'Male': { 'Interview':0, 'Observation':0 },
                    'Female': { 'Interview':0, 'Observation':0 },
                    'Transgender': { 'Interview':0, 'Observation':0 },
                    'Gender Non-Conforming': { 'Interview':0, 'Observation':0 },
                    'Unknown Gender': { 'Interview':0, 'Observation':0 },
                    'Total': { 'Interview':0, 'Observation':0 },
                },
                'Subpopulations':	{
                    'Veteran Yes': { 'Interview':0, 'Observation':0 },
                    'Veteran No': { 'Interview':0, 'Observation':0 },
                    'Chronically Homeless': { 'Interview':0, 'Observation':0 },
                    'Not Chronically Homeless': { 'Interview':0, 'Observation':0 },
                    'Substance Abuse': { 'Interview':0, 'Observation':0 },
                    'No Substance Abuse': { 'Interview':0, 'Observation':0 },
                    'Unknown Substance Abuse': { 'Interview':0, 'Observation':0 },
                    'PTSD': { 'Interview':0, 'Observation':0 },
                    'No PTSD': { 'Interview':0, 'Observation':0 },
                    'Unknown PTSD': { 'Interview':0, 'Observation':0 },
                    'Mental Health Conditions': { 'Interview':0, 'Observation':0 },
                    'No Mental Health Conditions': { 'Interview':0, 'Observation':0 },
                    'Unknown Mental Health Conditions': { 'Interview':0, 'Observation':0 },
                    'Physical Disability': { 'Interview':0, 'Observation':0 },
                    'No Physical Disability': { 'Interview':0, 'Observation':0 },
                    'Unknown Physical Disability': { 'Interview':0, 'Observation':0 },
                    'Developmental Disability': { 'Interview':0, 'Observation':0 },
                    'No Developmental Disability': { 'Interview':0, 'Observation':0 },
                    'Unknown Developmental Disability': { 'Interview':0, 'Observation':0 },
                    'Brain Injury': { 'Interview':0, 'Observation':0 },
                    'No Brain Injury': { 'Interview':0, 'Observation':0 },
                    'Unknown Brain Injury': { 'Interview':0, 'Observation':0 },
                    'Victim of Domestic Violence': { 'Interview':0, 'Observation':0 },
                    'Not Victim of Domestic Violence': { 'Interview':0, 'Observation':0 },
                    'Unknown Victim of Domestic Violence': { 'Interview':0, 'Observation':0 },
                    'AIDS or HIV': { 'Interview':0, 'Observation':0 },
                    'No AIDS or HIV': { 'Interview':0, 'Observation':0 },
                    'Unknown AIDS or HIV': { 'Interview':0, 'Observation':0 },
                    'Jail Release 90 Days: Probation': { 'Interview':0, 'Observation':0 },
                    'Jail Release 90 Days: Parole': { 'Interview':0, 'Observation':0 },
                    'Jail Release 90 Days: Completed Sentence': { 'Interview':0, 'Observation':0 },
                    'Jail Release 90 Days: (Unspecified)': { 'Interview':0, 'Observation':0 },
                    'Jail Release 12 Months: Probation': { 'Interview':0, 'Observation':0 },
                    'Jail Release 12 Months: Parole': { 'Interview':0, 'Observation':0 },
                    'Jail Release 12 Months: Completed Sentence': { 'Interview':0, 'Observation':0 },
                    'Jail Release 12 Months: (Unspecified)': { 'Interview':0, 'Observation':0 },
                    'No Jail': { 'Interview':0, 'Observation':0 },
                    'Unknown Jail': { 'Interview':0, 'Observation':0 },
                    //'Families with Children': { 'Interview':0, 'Observation':0 },
                    'Total': { 'Interview':0, 'Observation':0 },
                },	
        }
        }

        for (var i = 0; i < indata.length ; i++)
        {
            data[indata[i]['CityName']]['District'] = indata[i]['District'];
            data[indata[i]['CityName']][indata[i]['Catergory']][indata[i]['Subpopulation']]['Interview'] = indata[i]['Interview'];
            data[indata[i]['CityName']][indata[i]['Catergory']][indata[i]['Subpopulation']]['Observation'] = indata[i]['Observation'];
        }

        this.setState({
            data: data
        })
    }
    createTable(incity){
        var Catergories = [
            'Race',
            'Ethinicity',
            'Gender',
            'Age',
            'Subpopulations'
        ]
        
        var Titles = {
            'Race': [ //7
                'American Indian',
                'Asian',
                'Black',
                'Native Hawaiian',
                'White',
                'Multiple Races',
                'Unknown Race',
                'Total', 
            ],
            'Ethinicity': [ //4
                'Hispanic',
                'NonHispanic',
                'Unknown Ethinicity',
                'Total',
            ],
            'Gender': [ //6
                'Male',
                'Female',
                'Transgender',
                'Gender Non-Conforming',
                'Unknown Gender',
                'Total',
            ],
            'Age': [ //5
                'Adults (>24)',
                'Youth (18-24)',
                'Children (<18)',
                //'Elderly (62+)',
                'Unknown Age',
                'Total',
            ],
            
            'Veterans': [
                'Veteran Yes',
                'Veteran No',
            ],
            'Chronically Homeless': [
                'Chronically Homeless',
                'Not Chronically Homeless',
            ],
            'Substance Abuse': [
                'Substance Abuse',
                'No Substance Abuse',
                'Unknown Substance Abuse',
            ],
            'PTSD': [
                'PTSD',
                'No PTSD',
                'Unknown PTSD',
            ],
            'Mental Health Conditions': [
                'Mental Health Conditions',
                'No Mental Health Conditions',
                'Unknown Mental Health Conditions',
            ],
            'Physical Disability': [
                'Physical Disability',
                'No Physical Disability',
                'Unknown Physical Disability',
            ],
            'Developmental Disability': [
                'Developmental Disability',
                'No Developmental Disability',
                'Unknown Developmental Disability',
            ],
            'Brain Injury': [
                'Brain Injury',
                'No Brain Injury',
                'Unknown Brain Injury',
            ],
            'Victim of Domestic Violence': [
                'Victim of Domestic Violence',
                'Not Victim of Domestic Violence',
                'Unknown Victim of Domestic Violence',
            ],
            'AIDS or HIV': [
                'AIDS or HIV',
                'No AIDS or HIV',
                'Unknown AIDS or HIV',
            ],
            'Jail': [
                'Jail Release 90 Days: Probation',
                'Jail Release 90 Days: Parole',
                'Jail Release 90 Days: Completed Sentence',
                'Jail Release 90 Days: (Unspecified)',
                'Jail Release 12 Months: Probation',
                'Jail Release 12 Months: Parole',
                'Jail Release 12 Months: Completed Sentence',
                'Jail Release 12 Months: (Unspecified)',
                'No Jail',
                'Unknown Jail',
            ],
            // 'Families with Children' : [
            //     'Families with Children',
            // ]
        }

        var SubPopHeaders = [
            'Veterans',
            'Chronically Homeless',
            'Substance Abuse',
            'PTSD',
            'Mental Health Conditions',
            'Physical Disability',
            'Developmental Disability',
            'Brain Injury',
            'Victim of Domestic Violence',
            'AIDS or HIV',
            'Jail',
            //'Families with Children'
        ]
        
        var curCity;
        var table = [];
        var tableRow = [];

        for (var x = 0; x < this.state.curCities.length && Object.keys(this.state.households).length > 0; x++)
        {
            //console.log(x);
            curCity= this.state.curCities[x];
            //console.log(curCity);
            tableRow  = [];
            //console.log(Object.keys(this.state.data))
            var a = 0, curTot = 0, int = 0, obs = 0;
            if (Object.keys(this.state.data).length > 0)
            {
            // creates table rowa then pushes to table
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
        //console.log(this.state.households);
        //console.log(this.state.data);
        return(
            <div className="row">
                <div className="col-sm-3 leftCol">
                    <Select options={this.state.selectOptions} onChange={ (value) => {if (value.value.length > 2) { 
                        this.setState({curCities: [value.value]}); console.log(value); } } } />
                    <br/>
                    <ReactToPrint
                        trigger={() => <button href="#">Print Table</button>}
                        content={() => this.componentRef}
                    />
                </div>
                <div className="col-sm-9 tableCol">
                    <table ref={el => (this.componentRef = el)} className="paperSize">
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
                            {this.createTable(this.state.curCity)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}