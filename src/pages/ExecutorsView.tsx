/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';
import { rtstate2str } from '@app/utils/helpers';
import { ContentHeader } from '@components';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function approveExecutor(executorname) {
    let api = global.colonies
    api.load().then(() => {
        api.approveExecutor(executorId, global.colonyPrvKey)
    }).catch((err) => {
        console.log(err)
    })
}

function rejectExecutor(executorname) {
    let api = global.colonies
    api.load().then(() => {
        api.rejectExecutor(executorId, global.colonyPrvKey)
    }).catch((err) => {
        console.log(err)
    })
}

function unregisterExecutor(executorname) {
    let api = global.colonies
    api.load().then(() => {
        api.removeExecutor(executorname, global.colonyPrvKey)
    }).catch((err) => {
        console.log(err)
    })
}

class ExecutorsView extends Component {
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
                this.setState({ executors: executors })
            })
            this.interval = setInterval(() => {
                api.getExecutors(global.colonyName, global.executorPrvKey).then((executors) => {
                    this.setState({ executors: executors })
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
        const { executors } = this.state;
        const items = []
        let props = this.props
        if (executors == null) {
            return (<h5>No Executors found</h5>)
        }
        const Trigger = (executorname) => {
            props.navigate("/executor?executorname=" + executorname)
        }

        for (let i = 0; i < executors.length; i++) {
            let executor = executors[i]

            let approveButton = null
            if (executor.state == 0) {
                approveButton = <Button variant="secondary" style={{ width: "70px", margin: "2px" }} size="sm" onClick={() => approveExecutor(executor.executorname)}>Approve</Button>
            } else if (executor.state == 1) {
                approveButton = <Button variant="secondary" style={{ width: "70px", margin: "2px" }} size="sm" onClick={() => rejectExecutor(executor.executorname)}>Reject</Button>
            } else if (executor.state == 2) {
                approveButton = <Button variant="secondary" style={{ width: "70px", margin: "2px" }} size="sm" onClick={() => approveExecutor(executor.executorname)}>Approve</Button>
            }

            if (global.colonyPrvKey != "") {
                items.push(<tr key={executor.executorname} onClick={() => { Trigger(executor.executorname) }}>
                    <td>  <i class="fas fa-robot"></i> &nbsp; {executor.executorname}</td>
                    <td> {executor.executortype}</td>
                    <td> {rtstate2str(executor.state)}</td>
                    <td> {parseTime(executor.commissiontime)}</td>
                    <td> {parseTime(executor.lastheardfromtime)}</td>
                    <td>
                        {approveButton}{' '}
                        <Button variant="secondary" style={{ width: "70px", margin: "2px" }} size="sm" onClick={() => unregisterExecutor(executor.executorname)}>
                            Remove
                        </Button>
                    </td>
                </tr >)
            } else {
                items.push(<tr key={executor.executorname} onClick={() => { Trigger(executor.executorname) }}>
                    <td>  <i class="fas fa-robot"></i> &nbsp; {executor.executorname}</td>
                    <td> {executor.executortype}</td>
                    <td> {rtstate2str(executor.state)}</td>
                    <td> {parseTime(executor.commissiontime)}</td>
                    <td> {parseTime(executor.lastheardfromtime)}</td>
                </tr >)
            }
        }

        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
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

const PageWithNavigate = () => {
    const navigate = useNavigate();
    return (
        <ExecutorsView navigate={navigate} />
    )
}


export default PageWithNavigate;

