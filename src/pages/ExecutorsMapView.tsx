/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useState, useEffect } from "react";
import { global } from '../global'
import { parseTime } from '@app/utils/helpers';
import { rtstate2str } from '@app/utils/helpers';
import { Marker, Popup, MapContainer, TileLayer, useMap } from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
});

L.Marker.prototype.options.icon = DefaultIcon;

const ResizeMap = () => {
    const map = useMap();
    map._onResize();
    return null;
};

class ExecutorsMapView extends Component {
    constructor() {
        super();
        this.state = {
            executors: [],
        };
    }

    componentDidMount() {
        let api = global.colonies
        let state = this.props.state
        api.load().then(() => {
            api.getExecutors(global.colonyName, global.executorPrvKey).then((executors) => {
                if (executors == null) {
                    this.setState({ executors: [] })
                } else {
                    this.setState({ executors: executors })
                }
            })
            this.interval = setInterval(() => {
                api.getExecutors(global.colonyName, global.executorPrvKey).then((executors) => {
                    if (executors == null) {
                        this.setState({ executors: [] })
                    } else {
                        this.setState({ executors: executors })
                    }
                })
            }, 10000)

        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { executors } = this.state;
        const items = []

        for (let i = 0; i < executors.length; i++) {
            let executor = executors[i]

            if (executor.location.long != 0 && executor.location.lat != 0) {
                items.push(
                    <Marker position={[executor.location.long, executor.location.lat]} >
                        <Popup>
                            {executor.executortype}
                        </Popup>
                    </ Marker>
                )
            }
        }

        return (
            <div id="map"
                style={{
                    height: "800px", width: "100%"
                }}>
                <MapContainer ref="map" attributionControl={false} id='map-container' center={[54.71866128756121, 19.22332039378996]} zoom={4}
                    zoomControl={false} scrollWheelZoom={true} style={{ height: "800px", width: "100%" }}>
                    <ResizeMap />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {items}
                </MapContainer>
            </div >
        );
    }
}

export default ExecutorsMapView;
