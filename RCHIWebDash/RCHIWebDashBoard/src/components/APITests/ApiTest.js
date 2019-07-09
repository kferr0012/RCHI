import React, { Component } from 'react';
import axios from 'axios';

export default class APITest extends Component {
    state = {
        data: [],
    }

    componentWillMount(){
        this.loadBooks();
    }

    async loadBooks()
    {
        const promise = await axios.get("http://localhost:8000/api/HouseholdsbyCity2019/");
        const status = promise.status;
        if(status===200)
        {
        const data = promise.data;
        this.setState({data:data});
        }
    }

    createTable = () => {
        const { data } = this.state;
        if (data.length === 0){
            return;
        }

        var table = [];
        var tableRow = [];
        var headers = Object.keys(data[0]);

        for (let i = 0; i < headers.length; i++){
            tableRow.push(<th>{headers[i]}</th>)
        }
        table.push(<tr>{tableRow}</tr>);
        
        for (let i = 0; i < data.length; i++){
            tableRow = [];
            for (let j = 0; j < headers.length; j++){
                tableRow.push(<td>{data[i][headers[j]]}</td>)
            }
            table.push(<tr>{tableRow}</tr>);
        }
        return table;
    }

    render(){
        return(
            <div>
                {/* <p>{JSON.stringify(this.state.data)}</p> */}
                <table>
                    <tbody>
                        {this.createTable()}
                    </tbody>
                </table>
            </div>
        );
    }

}