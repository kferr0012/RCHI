import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON, LayersControl } from 'react-leaflet';
import axios from 'axios';
import { Dimmer, Loader } from 'semantic-ui-react';

import './map.css';
import SupervisorDistricts from './json/Supervisor_Districts.json'
import Cities from './json/Cities.json'
import County from './json/County.json'

import { remove, subset } from '../Utilities/ListManipulation/filter'
import { colors } from '../Utilities/colors'
import { countyColor, backgroundStroke, lat, lng, subPopLink, cityNames, raceCategories, genderCategories, defaultZoom  } from './constants';
import CategoryBar from './CategoryBar'

export default class LLMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            zoom: defaultZoom, // zoom level 
            curClicked: 0, // the object currently selected
            data: [], // data from api call
            raceData: [], // filtered data for race bar,
            genderData: [], // filtered data for gender bar,
            chartKey: 0, // Used to force a chart rerender
        };
    }

    componentWillMount() {
        this.fetchSubpopulationData();
    }

    async fetchSubpopulationData() {
        const promise = await axios.get(subPopLink);
        const indata = promise.status===200 ? promise.data: [];
        if (indata.length === 0){
            throw Error;
        }

        var raceData = indata;
        raceData = remove( raceData , 'subpopulation', 'Total');
        raceData = remove( raceData , 'city', 'Riverside');
        raceData = subset( raceData, 'category', 'Race');

        var genderData = indata;
        genderData = remove( genderData , 'subpopulation', 'Total');
        genderData = remove( genderData , 'city', 'Riverside');
        genderData = subset( genderData, 'category', 'Gender');

        this.setState({
            data: indata,
            raceData: raceData,
            genderData: genderData,
            chartKey: Math.random(),
        })
    }

    resetZoom = () => {
        this.refs.map.leafletElement.flyTo([lat, lng], this.state.zoom); // or flyTo
        this.setState({
            curClicked: 0,
        })
    }
    
    fitBounds = (bounds, clicked) => {
        if (clicked == this.state.curClicked){
           this.resetZoom();
        }
        else{
            this.refs.map.leafletElement.fitBounds(bounds); // or flyTo
            this.setState({
                curClicked: clicked,
            })
        }

    }

    highlightFeature = (feature) => {
        var layer = feature.target;
        this.setState({
            curHover: feature.target.feature.properties.DISTRICT ? feature.target.feature.properties.DISTRICT: feature.target.feature.properties.CITYNAME
        })
        
        layer.setStyle({
            weight: 1,
            color: countyColor,
            dashArray: '',
            fillOpacity: 0.7
        });
    }

    resetHighlight = (feature) => {
        var layer = feature.target;

        this.setState({
            curHover: 0
        })
        layer.setStyle({
            weight: 1,
            color: countyColor,
            dashArray: '',
            fillOpacity: 0.3
        });
    }
    clickDistricts = (feature) => {
        
        var layer = feature.target;
        
        layer.setStyle({
            weight: 1,
            color: countyColor,
            dashArray: '',
            fillOpacity: 0.7
        });
        this.fitBounds(layer._bounds,layer.feature.properties.DISTRICT);
    }

    clickCities = (feature) => {
        
        var layer = feature.target;
        
        layer.setStyle({
            weight: 1,
            color: countyColor,
            dashArray: '',
            fillOpacity: 0.7
        });
        this.fitBounds(layer._bounds,layer.feature.properties.CITYNAME);
    }

    onEachFeatureDistricts = (feature, layer) => {
        const { highlightFeature, resetHighlight, clickDistricts } = this;
        layer.on({
            click: clickDistricts,
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            //dblclick: this.resetZoom
        });
    }

    onEachFeatureCities = (feature, layer) => {
        const { highlightFeature, resetHighlight, clickCities } = this;
        layer.on({
            click: clickCities,
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            //dblclick: this.resetZoom
        });
    }

    render() {
        const position = [lat, lng];
        const { zoom, curClicked, data, curHover, raceData, genderData, chartKey } = this.state;
        const { onEachFeatureCities, onEachFeatureDistricts } = this;
        var place, curData;
        const disp = curHover ? curHover: curClicked;
        var clickedHeader = "";

        if (curClicked == 0) {
            clickedHeader = "Riverside County"
        }
        else if ( curClicked.length > 1 ) {
            if (cityNames[curClicked]){
                clickedHeader = cityNames[curClicked];
            }
            else {
                clickedHeader = curClicked.charAt(0) + curClicked.slice(1).toLowerCase();
            }   
        }
        else {
            clickedHeader = "Supervisoral District " + curClicked.toString();
        }

        if (disp == 0) {
            place = "Riverside County"
            curData = remove(data, "city", 'RIVERSIDE' ); // removes duplicate riverside
        }
        else if ( disp.length > 1 ) {
            if (cityNames[disp]){
                place = cityNames[disp];
            }
            else {
                place = disp.charAt(0) + disp.slice(1).toLowerCase();
            }   
            curData = subset(data, "city", disp );
        }
        else {
            place = "Supervisoral District " + disp.toString();
            curData = subset(data, "district", disp.toString() );
        }
        
        var t = subset(subset(curData, 'category', 'Age'), 'subpopulation', 'Total'); // gets totals

        var tot = 0;
        for (var x = 0; x < t.length; x++){
            tot += t[x].interview;
            tot += t[x].observation;
        }

        return (
            <div className="allContent">
                {/* <h4>Welcome to the Riverside County Health Informatics Data Portal</h4>
                <p> In this application, we display the data gathered through the annual Riverside County Point-In-Time Homelessness Count.</p>
                <p> We hope that through these graphs, tables, and dashboards, everyone can better understand the position of the homeless and </p>
                <p> how the county of Riverside can better serve them.</p>
                 */}
                <h4 key={Math.random()}>{place} - Total Unsheltered Individuals: {tot}</h4>
                <div className="row">
                    <div className="col-md">
                        <div className="chart row">
                            <p className="chartTitle">{clickedHeader + " - Race Totals"}</p>
                            <CategoryBar key={chartKey} keys={raceCategories} rawData={raceData} category={"Race"} curClicked={curClicked}/>
                        </div>
                        <div className="chart row">
                            <p className="chartTitle">{clickedHeader + " - Gender Totals"}</p>
                            <CategoryBar key={chartKey} keys={genderCategories} rawData={genderData} category={"Gender"} curClicked={curClicked}/>
                        </div>
                    </div>
                    <div className="col-md">
                        <Map id="myleafletmap" ref='map'
                            center={position}
                            zoom={zoom} 
                            scrollWheelZoom={false} 
                            zoomControl={true}
                            doubleClickZoom={false}
                            dragging={true}                    
                            >
                            <TileLayer
                                url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
                                attribution= 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                            />
                            <GeoJSON 
                                data={County}
                                style={{
                                    weight: .5,
                                    color: backgroundStroke,
                                    dashArray: '',
                                    fillOpacity: 0.0
                                }}
                            />
                            <GeoJSON 
                                data={SupervisorDistricts}
                                style={{
                                    weight: 1,
                                    color: countyColor,
                                    fillColor: countyColor,
                                    dashArray: '',
                                    fillOpacity: 0.0
                                }}

                            />
                            <LayersControl collapsed={false} position="topright" >
                                <LayersControl.BaseLayer name="Districts" checked={true}>
                                    <GeoJSON 
                                        data={SupervisorDistricts}
                                        style={{
                                            weight: 1,
                                            color: countyColor,
                                            fillColor: countyColor,
                                            dashArray: '',
                                            fillOpacity: 0.3
                                        }}
                                        onEachFeature={onEachFeatureDistricts}
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="Cities">
                                    <GeoJSON 
                                        data={Cities}
                                        style={{
                                            weight: 1,
                                            color: countyColor,
                                            fillColor: countyColor,
                                            dashArray: '',
                                            fillOpacity: 0.3
                                        }}
                                        onEachFeature={onEachFeatureCities}
                                    />
                                </LayersControl.BaseLayer>
                            </LayersControl>
                        
                            {/* <Marker position={position}>
                                <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker> */}
                        </Map>
                    </div>
                </div>
            </div>
        )
    }
}