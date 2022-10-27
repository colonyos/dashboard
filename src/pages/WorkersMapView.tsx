/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import { parseTime } from '@app/utils/helpers';
import { rtstate2str } from '@app/utils/helpers';
import { Map, Marker } from "pigeon-maps"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Popover right</Popover.Header>
        <Popover.Body>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
        </Popover.Body>
    </Popover>
);

class WorkersMapView extends Component {
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

        for (let i = 0; i < runtimes.length; i++) {
            let runtime = runtimes[i]

            if (runtime.location.long != 0 && runtime.location.lat != 0) {
                items.push(
                    <Marker width={50} anchor={[runtime.location.long, runtime.location.lat]} color={"gray"} />
                )
            }
        }

        return (
            <Map height={1000} defaultCenter={[54.71866128756121, 19.22332039378996]} defaultZoom={4}>
                {items}
            </Map>

        );
    }
}

export default WorkersMapView;
