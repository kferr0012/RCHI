import React, { Component } from 'react';
import './districtPopTable.css';

export default class DistrictPopTable extends Component {
    createTable(){
        var cats = [ // Based of catergories creates table - I did this because the catergoiries are always the same and also need to be in order
            'Total Count',
            'Interview',
            'Observational',
            'Adults (>25)',
            'Youth (18-24)',
            'Children (<17)',
            'Unknown Age',
            'Male',
            'Female',
            'Transgender',
            'Gender Non Conforming',
            'Unknown Gender',
            'Veterans',
            //'Household',
        ]

        let table = [];
        let tableRow  = [];

        // creates table rowa then pushes to table
        for (var i = 0; i < cats.length; i++)
        {
            tableRow = []
            tableRow.push ( <th> {cats[i]} </th> );
            tableRow.push ( <td> {this.props.data2018[cats[i]]} </td> );
            tableRow.push ( <td> {this.props.data2019[cats[i]]} </td> );

            if ( i%2 == 0)
                table.push( <tr className="shaded"> {tableRow} </tr>);
            else
                table.push( <tr> {tableRow } </tr>);
        }
        return table;
    }
    render(){
        return(
            <div>
                <table className="width100">
                    <thead>
                        <tr>
                            <th className="col1">    </th>
                            <th className="col2">2018</th>
                            <th className="col3">2019</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createTable()}
                    </tbody>
                </table>
            </div>
        );
    }
}