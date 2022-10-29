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

class WorkersMapViewOld extends Component {
    constructor() {
        super();
        this.state = {
            runtimes: [],
        };
    }

    componentDidMount() {
        let rt = global.runtime
        let state = this.props.state
        rt.load().then(() => {
            rt.getRuntimes(global.colonyId, global.runtimePrvKey).then((runtimes) => {
                this.setState({ runtimes: runtimes })
            })
            this.interval = setInterval(() => {
                rt.getRuntimes(global.colonyId, global.runtimePrvKey).then((runtimes) => {
                    this.setState({ runtimes: runtimes })
                })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { runtimes } = this.state;
        const items = []
        if (runtimes == null) {
            return (<h5>No workers found</h5>)
        }

        // for (let i = 0; i < runtimes.length; i++) {
        //     let runtime = runtimes[i]

        //     if (runtime.location.long != 0 && runtime.location.lat != 0) {
        //         items.push(
        //             <Marker width={50} anchor={[runtime.location.long, runtime.location.lat]} color={"green"} />
        //         )
        //     }
        // }

        return (
            <Map
                initialViewState={{
                    longitude: -122.4,
                    latitude: 37.8,
                    zoom: 14
                }}
                style={{ width: 600, height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            />
        );
    }
}

class WorkersMapView extends Component {
    constructor() {
        super();
        this.state = {
            runtimes: [],
        };
    }

    componentDidMount() {
        this.resizeInterval = setInterval(function() {
            window.dispatchEvent(new Event('resize'));
        }, 100);

        let rt = global.runtime
        let state = this.props.state
        rt.load().then(() => {
            rt.getRuntimes(global.colonyId, global.runtimePrvKey).then((runtimes) => {
                this.setState({ runtimes: runtimes })
            })
            this.interval = setInterval(() => {
                rt.getRuntimes(global.colonyId, global.runtimePrvKey).then((runtimes) => {
                    this.setState({ runtimes: runtimes })
                })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.resizeInterval)
        clearInterval(this.interval)
    }

    render() {
        const { runtimes } = this.state;
        const items = []

        const position = [51.505, -0.09]

        for (let i = 0; i < runtimes.length; i++) {
            let runtime = runtimes[i]

            if (runtime.location.long != 0 && runtime.location.lat != 0) {
                items.push(
                    <Marker position={[runtime.location.long, runtime.location.lat]} >
                        <Popup>
                            {runtime.name}
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
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {items}
                </MapContainer>
            </div >
        );
    }
}

export default WorkersMapView;
