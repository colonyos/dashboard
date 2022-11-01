/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';
import { rtstate2str } from '@app/utils/helpers';
import { ContentHeader } from '@components';
import Button from 'react-bootstrap/Button';

function approveRuntime(runtimeId) {
    let rt = global.runtime
    rt.load().then(() => {
        rt.approveRuntime(runtimeId, global.colonyPrvKey)
    }).catch((err) => {
        console.log(err)
    })
}

function rejectRuntime(runtimeId) {
    let rt = global.runtime
    rt.load().then(() => {
        rt.rejectRuntime(runtimeId, global.colonyPrvKey)
    }).catch((err) => {
        console.log(err)
    })
}

function unregisterRuntime(runtimeId) {
    let rt = global.runtime
    rt.load().then(() => {
        rt.removeRuntime(runtimeId, global.colonyPrvKey)
    }).catch((err) => {
        console.log(err)
    })
}

class WorkersView extends Component {
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
                }).catch((err) => {
                    console.log(err)
                })
            }, 1000)
        }).catch((err) => {
            console.log(err)
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

            let approveButton = null
            if (runtime.state == 0) {
                approveButton = <Button variant="primary" size="sm" onClick={() => approveRuntime(runtime.runtimeid)}>Approve</Button>
            } else if (runtime.state == 1) {
                approveButton = <Button variant="warning" size="sm" onClick={() => rejectRuntime(runtime.runtimeid)}>Reject</Button>
            } else if (runtime.state == 2) {
                approveButton = <Button variant="primary" size="sm" onClick={() => approveRuntime(runtime.runtimeid)}>Approve</Button>
            }

            items.push(<tr key={runtime.runtimeid}>
                <td> {runtime.runtimeid}</td>
                <td> {runtime.name}</td>
                <td> {runtime.runtimetype}</td>
                <td> {rtstate2str(runtime.state)}</td>
                <td> {parseTime(runtime.commissiontime)}</td>
                <td> {parseTime(runtime.lastheardfromtime)}</td>
                <td>
                    {approveButton}{' '}
                    <Button variant="danger" size="sm" onClick={() => unregisterRuntime(runtime.runtimeid)}>
                        Remove
                    </Button>
                </td>
            </tr >)
        }

        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Runtime Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>State</th>
                        <th>Commission Time</th>
                        <th>Last Heard From</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table >
        );
    }
}

export default WorkersView;
