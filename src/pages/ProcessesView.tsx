/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';
import { parseArr } from '@app/utils/helpers';
import Button from 'react-bootstrap/Button';

class ProcessesView extends Component {
    constructor() {
        super();
        this.state = {
            processes: [], state: -1
        };
    }

    componentDidMount() {
        let api = global.colonies
        let state = this.props.state
        api.load().then(() => {
            api.getProcesses(global.colonyName, 100, state, global.executorPrvKey).then((processes) => {
                this.setState({ processes: processes, state: state })
            })
            this.interval = setInterval(() => {
                api.getProcesses(global.colonyName, 100, state, global.executorPrvKey).then((processes) => {
                    this.setState({ processes: processes, state: state })
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

        const DeleteProcess = (e, processid) => {
            console.log(processid)
            let api = global.colonies
            api.load().then(() => {
                api.DeleteProcess(processid, global.executorPrvKey)
            })
            e.stopPropagation();
            props.navigate("/processes")
        }

        const { processes, state } = this.state;
        const items = []
        if (processes == null) {
            return (<h5>No processes found</h5>)
        }

        for (let i = 0; i < processes.length; i++) {
            let process = processes[i]

            if (state == 0) {
                items.push(<tr key={process.processid} onClick={() => { Trigger(process.processid) }}>
                    <td> <i class="fas fa-cube"></i> &nbsp; {process.spec.funcname} </td>
                    <td> {parseTime(process.submissiontime)}</td>
                    <td> {parseArr(process.spec.args)} </td>
                    <td> {process.spec.conditions.executortype}</td>
                    <td> {process.initiatorname}</td>
                    <td>
                        <Button variant="secondary" onClick={(e) => DeleteProcess(e, process.processid)}>
                            Delete
                        </Button>
                    </td>
                </tr>)
            } else {
                items.push(<tr key={process.processid} onClick={() => { Trigger(process.processid) }}>
                    <td> <i class="fas fa-cube"></i> &nbsp; {process.spec.funcname} </td>
                    <td> {parseTime(process.submissiontime)}</td>
                    <td> {parseArr(process.spec.args)} </td>
                    <td> {process.spec.conditions.executortype}</td>
                    <td> {process.initiatorname}</td>
                </tr>)
            }
        }

        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Submission Time</th>
                        <th>Function</th>
                        <th>Args</th>
                        <th>Target Executor Type</th>
                        <th>Initator</th>
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
