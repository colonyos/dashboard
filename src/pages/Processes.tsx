/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';

class ProcessesView extends Component {
    constructor() {
        super();
        this.state = {
            processes: [],
        };
    }

    componentDidMount() {
        let rt = global.runtime
        let state = this.props.state
        rt.load().then(() => {
            rt.getProcesses(global.colonyId, 100, state, global.runtimePrvKey).then((processes) => {
                this.setState({ processes: processes })
            })
            this.interval = setInterval(() => {
                rt.getProcesses(global.colonyId, 100, state, global.runtimePrvKey).then((processes) => {
                    this.setState({ processes: processes })
                })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let props = this.props
        const Trigger = (processid) => {
            props.navigate("/process?processid=" + processid)
        }

        const { processes } = this.state;
        const items = []
        if (processes == null) {
            return (<h5>No processes found</h5>)
        }

        for (let i = 0; i < processes.length; i++) {
            let process = processes[i]

            items.push(<tr key={process.processid} onClick={() => { Trigger(process.processid) }}>
                <td> {process.processid}</td>
                <td> {parseTime(process.submissiontime)}</td>
                <td> {process.spec.func} </td>
                <td> {process.spec.args} </td>
                <td> {process.spec.conditions.runtimetype}</td>
            </tr>)
        }

        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Process Id</th>
                        <th>Submission Time</th>
                        <th>Function</th>
                        <th>Args</th>
                        <th>Target Runtime Type</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table >

        );
    }
}

export default ProcessesView;
