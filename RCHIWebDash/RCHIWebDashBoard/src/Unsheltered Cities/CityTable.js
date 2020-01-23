import React, {Component} from 'react'
import BarGraph from '../components/TestingBranch/BarGraph'
import {CustomToggle, CustomMenu} from './components/CustomToggle'
import {Dropdown, Button} from 'react-bootstrap'
import PieChart from "../components/charts/PieChart";
import PieGraph from "../components/charts/PieGraph";
import Number from "../components/Numbers/Number";
import Total from '../components/Numbers/Total'
import {Row, Col} from 'antd'

import './DottedBox.css';

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const DottedBox = () => (
    <div className="DottedBox">
      <p className="DottedBox_content">Graph/Table</p>
    </div>
  );


export default class CityTable extends Component{
    constructor(props){
        super(props)

        this.state = {
            cityChoice : "Beaumont",
            value : "",
            trigger : true,
            fetched: false

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myData = []
        
    }
    async getData(){

        if(!this.state.fetched){
        this.state.url = ["http://127.0.0.1:8000/api/CityTotalByYear/?",
                          "http://127.0.0.1:8000/api/SubpopulationsByCity2019/?",
                         ]
        
          
        for(var i = 0 ; i < this.state.url.length ; i++){
           
            await fetch(this.state.url, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then((data) =>{
                console.log("data found")
                this.myData[i] = data
            })
            .catch(err => {
                console.log("no data found")
            })
        
        }

        }
        console.log("finally fetched")
        console.log(this.myData)

        this.setState({
            fetched : true
        })

    }
    componentDidMount(){
        this.getData()
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleSubmit(event) {
        console.log("before: ")
        console.log(this.state.cityChoice)

        this.setState({cityChoice : this.state.value})
    }
    
    runGraphs(city){
        return(

            <div>
                 <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} type="flex" justify="space-around" align="middle" >
                <Col className="gutter-row" span={7}>
                    <h5>Age Table</h5> 
                    <DottedBox >col-1</DottedBox>
                </Col>
                <Col className="gutter-row" span={10}>
                    <Row>
                        <Col className="gutter-row" span={6}>
                            num-1
                            <DottedBox>num-1</DottedBox>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            num-2
                            <DottedBox>num-2</DottedBox>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            num-3
                            <DottedBox>num-3</DottedBox>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={7}>
                    <h5>Gender</h5> 
                    <DottedBox> col-3</DottedBox>
                </Col>
            </Row>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} type="flex" justify="center" align="top" >
                <Col className="gutter-row"  span={7}>
                        <h5>Subpopulation</h5> 
                        <DottedBox >col-1</DottedBox>
                </Col>
                <Col className="gutter-row" span={17}>
                        <Row>
                            <Col className="gutter-row" span={16}>
                                <row>
                                    <Col className="gutter-row" span={12}>
                                        graph
                                    </Col>
                                    <Col className="gutter-row" span={12}>
                                        pie graph
                                    </Col>
                                </row>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                bar graph
                                <DottedBox>num-2</DottedBox>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={16}>
                                line graph
                                <DottedBox>num-1</DottedBox>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                table
                                <DottedBox>num-2</DottedBox>
                            </Col>
                        </Row>
                </Col>
            </Row>
            <BarGraph height = {400} 
            width = {800} 
            url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search='+ city + '+Race'}
            indexBy = "subpopulation"
            keys = {["interview", "observation"]}
            
            /> 
            <BarGraph height = {400} 
            width = {800} 
            url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search='+ city + '+Gender'}
            indexBy = "subpopulation"
            keys = {["interview", "observation"]}
 
            />

           <PieGraph height = {400}
                     url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search=Ethinicity+' + city}
           />

            <PieGraph height = {400}
                        url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search=Gender+' + city}
            />


            <Number height = {400}
                        url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search=homeless+' + city}
            />
            <Total height = {400}
                    url = {'http://127.0.0.1:8000/api/SubpopulationsByCity2019/?search=Age+' + city}
            />





            </div>    
        )
    }
    render(){
    
        return(
            <div>
            <input style = {{width : 300}} type="text" value={this.state.value} onChange={this.handleChange} />
            <Button onClick = {this.handleSubmit}> Submit </Button>           

            {this.runGraphs(this.state.cityChoice)}
            </div>
        )
    }
}
