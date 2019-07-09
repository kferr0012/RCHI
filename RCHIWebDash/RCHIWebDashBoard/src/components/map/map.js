import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON, LayersControl } from 'react-leaflet';
import './map.css';
import SupervisorDistricts from './json/Supervisor_Districts.json'
import Cities from './json/Cities.json'
import County from './json/County.json'

export default class LLMap extends Component {
    constructor(props){
        super(props);
        this.fitBounds = this.fitBounds.bind(this);
        this.resetZoom = this.resetZoom.bind(this);
    }

    state = {
        lat: 33.6906,
        lng: -116.1055,
        zoom: 8,
        curClicked: 0,
      }

    resetZoom(){
        this.refs.map.leafletElement.flyTo([this.state.lat, this.state.lng],8);
        this.state.curClicked = 0;
        console.log("reset");
    }
    
    fitBounds(bounds, clicked){
        if (clicked == this.state.curClicked)
        {
           this.resetZoom();
        }
        else
        {
            this.refs.map.leafletElement.flyToBounds(bounds);
            this.state.curClicked = clicked;
            console.log("zoom");
        }

    }

    render() {
        const position = [this.state.lat, this.state.lng]
        // var geojsonLayer = new L.GeoJSON.AJAX("SupervisorialDistricts.geojson");       
        // geojsonLayer.addTo(myleafletmap);
        function highlightFeature(feature){
            var layer = feature.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });
        }
        function resetHighlight(feature){
            var layer = feature.target;

            layer.setStyle({
                weight: 1,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.3
            });
        }
        function clickDistricts(feature){
            
            var layer = feature.target;
            console.log(feature);
            console.log(layer.feature.properties.DISTRICT);
            
            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });
            this.fitBounds(layer._bounds,layer.feature.properties.DISTRICT);
        }

        function clickCities(feature){
            
            var layer = feature.target;
            console.log(feature);
            console.log(layer.feature.properties.CITYNAME);
            
            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });
            this.fitBounds(layer._bounds,layer.feature.properties.CITYNAME);
        }

        function onEachFeatureDistricts(feature, layer) {
            layer.on({
                click: clickDistricts.bind(this),
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                //dblclick: this.resetZoom
            });
        }

        function onEachFeatureCities(feature, layer) {
            layer.on({
                click: clickCities.bind(this),
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                //dblclick: this.resetZoom
            });
        }

        return (
            <div>
            <Map id="myleafletmap" ref='map'
                center={position}
                zoom={this.state.zoom} 
                scrollWheelZoom={false} 
                zoomControl={false}
                doubleClickZoom={false}
                dragging={true}
                key={Math.random()}
                // click={/*console.log("pop")*/}
                
                onChange={(e) => (console.log("hi"))}
                >
                {/* <TileLayer
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
                    attribution= 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'

                /> */}
                {/* <GeoJSON 
                    data={County}
                    style={{
                        weight: .5,
                        color: '#666',
                        dashArray: '',
                        fillOpacity: 0.0
                    }}
                ></GeoJSON> */}
                <LayersControl position="topright" >
                    <LayersControl.BaseLayer name="Districts" checked={true}>
                        <GeoJSON 
                            data={SupervisorDistricts}
                            style={{
                                weight: 1,
                                color: '#666',
                                dashArray: '',
                                fillOpacity: 0.3
                            }}
                            onEachFeature={onEachFeatureDistricts.bind(this)}
                        ></GeoJSON>
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Cities">
                        <GeoJSON 
                            data={Cities}
                            style={{
                                weight: 1,
                                color: '#666',
                                dashArray: '',
                                fillOpacity: 0.3
                            }}
                            onEachFeature={onEachFeatureCities.bind(this)}
                        ></GeoJSON>
                    </LayersControl.BaseLayer>
                </LayersControl>
            
                {/* <Marker position={position}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </Map>
            <p>{JSON.stringify(this.state.bounds)}</p>
            {/* <p>{JSON.stringify(this.refs.map.leafletElement.getBounds())}</p> */}
            </div>
        )
    }
}