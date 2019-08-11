import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import Select from 'react-select'
import BarChart from '../charts/BarChart';
import ColorPicker from './ColorPicker';
import { Grid } from 'semantic-ui-react';

export default class DIYChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: '#FFF',
            title: '',
            curCities: '',
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
            selectOptions : [],
            chartData: [
                {
                    labels: ['Asian','American Indian','Black','White','Multiple','Native Hawaiian'],
                    datasets:[
                        {
                            data: [ 1,3,4,6,4,2 ],
                            backgroundColor: [
                                '#CC804F80',
                                '#4f9bcc80',
                                '#4f5ccc80',
                                '#cc4f5d80',
                                '#804fcc80',
                                '#bf4fcc80',
                                '#cc4f9b80'],
                            borderColor: [
                                '#CC804F',
                                '#4f9bcc',
                                '#4f5ccc',
                                '#cc4f5d',
                                '#804fcc',
                                '#bf4fcc',
                                '#cc4f9b'],
                        },
                    ]
                }
            ],
          };
    }

    componentWillMount() {
        /* 
            When its determined that the component will mount this parses all the csvs needed for the Supervisorial Districts and places them into state
        */
        // var csvFilePath = require("./csv/2019citySubPopulations.csv");
        // Papa.parse(csvFilePath, {
        //     header: true,
        //     download: true,
        //     skipEmptyLines: true,
        //     complete: this.updateData
        // });

        // csvFilePath = require("./csv/2019_cityHouseholds_modified.csv");
        // Papa.parse(csvFilePath, {
        //     header: true,
        //     download: true,
        //     skipEmptyLines: true,
        //     complete: this.updateHouseholdData
        // });

        var options = [];
        for (var i = 0; i < this.state.citynames.length; i++)
        {
            options.push({
                value: this.state.citynames[i],
                label: this.state.citynames[i]
            });
        }

        this.setState({
            selectOptions: options,
            maxYaxis: (Math.ceil(Math.max(...this.state.chartData[0].datasets[0].data))+1),
            minYaxis: (Math.floor(Math.min(...this.state.chartData[0].datasets[0].data))-1)
        })
    }

    handleColorChange (color, number){
        // console.log(color);
        // console.log(number);
        var newChartData = this.state.chartData;
        newChartData[0].datasets[0].backgroundColor[number]= color;
        this.setState({
            color: color,
            chartData: newChartData
        })
    }

    render(){
        console.log(this.state.maxYaxis);
        console.log(this.state.minYaxis);

        return(
            <Grid padded="vertically" container>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Select options={this.state.selectOptions} onChange={ (value) => {if (value.value.length > 2) { 
                            this.setState({curCities: [value.value]}); console.log(value); } } } 
                        />
                        <span>Graph Title</span>
                        <input className="graphBoundsInput" onChange={ (event) => {this.setState({title: event.target.value} ) }}/>
                        
                        <br/>
                        { this.state && this.state.chartData[0].datasets[0].data ?
                        <form> 
                            Graph Max 
                            <input 
                                className="graphBoundsInput" 
                                type={'number'} 
                                defaultValue={(Math.ceil(Math.max(...this.state.chartData[0].datasets[0].data))+1)} 
                                onChange={(event) => {this.setState({maxYaxis: parseInt(event.target.value)})}}
                            />
                            <br/>
                            Graph Min 
                            <input 
                                className="graphBoundsInput" 
                                type={'number'} 
                                defaultValue={(Math.floor(Math.min(...this.state.chartData[0].datasets[0].data))-1)} 
                                onChange={(event) => {this.setState({minYaxis: parseInt(event.target.value)})}}
                            />
                        </form>: null}
                        <br/>
                        <span>Graph Colors</span> 
                        <br/>
                        {
                            this.state.chartData[0].datasets[0].backgroundColor.map( (color, idx) => {
                                return (
                                <ColorPicker
                                color={color}
                                onChange={(color) => this.handleColorChange(color, idx) }
                                />)
                            })
                        }
                        <br/>
                        <br/>
                        <ReactToPrint
                            trigger={() => <button href="#">Print Chart</button>}
                            content={() => this.componentRef}
                        />
                    </Grid.Column>
                    <Grid.Column width={12} ref={el => (this.componentRef = el)}>
                        <p>{this.state.title}</p>
                        <BarChart 
                            key={Math.random()} 
                            height={window.innerHeight*.35} 
                            datasets={this.state.chartData} 
                            data={0}
                            maxYaxis={this.state.maxYaxis}
                            minYaxis={this.state.minYaxis}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

