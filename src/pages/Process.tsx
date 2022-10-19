/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import React, { Component } from "react"
import { global } from '../global'
import Table from 'react-bootstrap/Table';

class ProcessView extends Component {
    constructor() {
        super();
        this.state = {
            process: {},
        };
    }

    componentDidMount() {
        let props = this.props
        let rt = global.runtime
        rt.load().then(() => {
            rt.getProcess(props.processid, global.runtimePrvKey).then((process) => {
                this.setState({ process: process })
            })
            this.interval = setInterval(() => {
                rt.getProcess(props.processid, global.runtimePrvKey).then((process) => {
                    this.setState({ process: process })
                })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    bool2str(b) {
        if (b) {
            return "true"
        }

        return false
    }

    state2str(state) {
        if (state == 0) {
            return "Pending"
        } else if (state == 1) {
            return "Running"
        } else if (state == 2) {
            return "Successful"
        } else if (state == 3) {
            return "Failed"
        } else {
            return "Unknown"
        }
    }

    render() {
        let props = this.props
        const Trigger = (processid) => {
            props.navigate("/process?processid=" + processid)
        }

        const { process } = this.state
        console.log(process)
        return (
            <Table striped bordered hover >
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <th>ProcessId</th>
                        <td>{process.processid}</td>
                    </tr>
                    <tr>
                        <th>Assigned RuntimeId</th>
                        <td>{process.assignedruntimeid}</td>
                    </tr>
                    <tr>
                        <th>Assigned</th>
                        <td>{this.bool2str(process.isassigned)}</td>
                    </tr>
                    <tr>
                        <th>State</th>
                        <td>{this.state2str(process.state)}</td>
                    </tr>
                </tbody>
            </Table >

        );

    }
}

const Page = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let processid = params.get('processid');
    return (
        <div>
            <ContentHeader title="Process" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <ProcessView processid={processid} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
