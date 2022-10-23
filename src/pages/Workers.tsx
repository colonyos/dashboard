/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { parseTime } from '@app/utils/helpers';
import { rtstate2str } from '@app/utils/helpers';
import { ContentHeader } from '@components';

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

            items.push(<tr key={runtime.runtimeid}>
                <td> {runtime.runtimeid}</td>
                <td> {runtime.name}</td>
                <td> {runtime.runtimetype}</td>
                <td> {rtstate2str(runtime.state)}</td>
                <td> {parseTime(runtime.commissiontime)}</td>
                <td> {parseTime(runtime.lastheardfromtime)}</td>
            </tr>)
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

const Page = () => {
    return (
        <div>
            <ContentHeader title="Registered workers" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <WorkersView />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
