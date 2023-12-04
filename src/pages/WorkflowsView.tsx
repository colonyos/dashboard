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
            fnDict: {}
        };
    }

    componentDidMount() {
        let api = global.colonies
        let state = this.props.state
        api.load().then(() => {
            api.getWorkflows(global.colonyName, 100, state, global.executorPrvKey).then((workflows) => {
                for (let i in workflows) {
                    let workflow = workflows[i]
                }

                this.setState({ workflows: workflows })
            })
            this.interval = setInterval(() => {
                api.getWorkflows(global.colonyName, 100, state, global.executorPrvKey).then((workflows) => {
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
                <td> <i class="fas fa-cubes"></i> &nbsp; {workflow.processgraphid}</td>
                <td> {parseTime(workflow.submissiontime)}</td>
                <td> {workflow.initiatorname}</td>
            </tr>)
        }

        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Workflow Id</th>
                        <th>Submission Time</th>
                        <th>Initiator</th>
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
