import React from 'react';
import './Map.css';
import {Map as LeafletMap, TileLayer} from "react-leaflet";
import { showDataOnMap } from './util';

function Map({countries,caseType,center,zoom}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright"> openStreetMap</a> contributors'>
                </TileLayer>
                {showDataOnMap(countries,caseType)}
            </LeafletMap>
        </div>
    )
}

export default Map
