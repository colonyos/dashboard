/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';

class WorkflowsView extends Component {
    constructor() {
        super();
        this.state = {
            workflows: [],
        };
    }

    componentDidMount() {
        let rt = global.runtime
        let state = this.props.state
        rt.load().then(() => {
            rt.getWorkflows(global.colonyId, 100, state, global.runtimePrvKey).then((workflows) => {
                this.setState({ workflows: workflows })
            })
            this.interval = setInterval(() => {
                rt.getWorkflows(global.colonyId, 100, state, global.runtimePrvKey).then((workflows) => {
                    this.setState({ workflows: workflows })
                })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let props = this.props
        const Trigger = (workflowid) => {
            props.navigate("/workflow?workflowid=" + workflowid)
        }

        const { workflows } = this.state;
        const items = []
        if (workflows == null) {
            return (<h5>No workflows found</h5>)
        }

        for (let i = 0; i < workflows.length; i++) {
            let workflow = workflows[i]
            items.push(<tr key={workflow.processgraphid} onClick={() => { Trigger(workflow.processgraphid) }}>
                <td> {workflow.processgraphid}</td>
                <td> {parseTime(workflow.submissiontime)}</td>
            </tr>)
        }

        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ProcessGraph Id</th>
                        <th>Submission Time</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table >

        );
    }
}

export default WorkflowsView;