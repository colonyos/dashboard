/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

class PendingProcessesView extends Component {
    constructor() {
        super();
        this.state = {
            processes: [],
        };
    }

    componentDidMount() {
        let rt = global.runtime
        rt.load().then(() => {
            rt.getProcesses(global.colonyId, 100, 0, global.runtimePrvKey).then((processes) => {
                this.setState({ processes: processes })
            })
            this.interval = setInterval(() => {
                rt.getProcesses(global.colonyId, 100, 0, global.runtimePrvKey).then((processes) => {
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
        for (let i = 0; i < processes.length; i++) {
            let process = processes[i]
            //console.log(process)
            items.push(<tr key={process.processid} onClick={() => { Trigger(process.processid) }}>
                <td> {process.processid}</td>
                <td> {process.submissiontime}</td>
                <td> {process.spec.func} {process.spec.args} </td>
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

const Page = () => {
    const navigate = useNavigate();
    return (
        <div>
            <ContentHeader title="Pending processes" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <PendingProcessesView navigate={navigate} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


export default Page;
