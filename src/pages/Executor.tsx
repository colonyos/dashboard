/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import React, { Component } from "react"
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import { parseTime } from '@app/utils/helpers';

class ExecutorView extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let executor = this.props.executor
        let location = {}
        let hardware = {}
        let software = {}
        if (Object.keys(executor).length > 0 && executor.constructor === Object) {
            location = executor.location
            software = executor.capabilities.software
            hardware = executor.capabilities.hardware
        }

        const items = []
        items.push(
            <Table striped bordered hover >
                <tbody>
                    <tr>
                        <th>Executor Name</th>
                        <td>{executor.executorname}</td>
                    </tr>
                    <tr>
                        <th>Executor Id</th>
                        <td>{executor.executorid}</td>
                    </tr>
                    <tr>
                        <th>Colony Id</th>
                        <td>{executor.colonyname}</td>
                    </tr>
                    <tr>
                        <th>Executor Type</th>
                        <td>{executor.executortype}</td>
                    </tr>
                    <tr>
                        <th>LastHeardFrom</th>
                        <td>{parseTime(executor.lastheardfromtime)}</td>
                    </tr>
                    <tr>
                        <th>Executor Commision Time</th>
                        <td>{parseTime(executor.commissiontime)}</td>
                    </tr>
                    <tr>
                        <th>Location Description</th>
                        <td>{location.desc}</td>
                    </tr>
                    <tr>
                        <th>Longitude</th>
                        <td>{location.long}</td>
                    </tr>
                    <tr>
                        <th>Latitude</th>
                        <td>{location.lat}</td>
                    </tr>
                </tbody >
            </Table>
        )
        return (
            <div> {items} </div>
        );
    }
}

class HardwareView extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let executor = this.props.executor
        let hardware = {}
        let gpu = {}
        if (Object.keys(executor).length > 0 && executor.constructor === Object) {
            hardware = executor.capabilities.hardware
            gpu = executor.capabilities.hardware.gpu
        }

        const items = []
        items.push(
            <Table striped bordered hover >
                <tbody>
                    <tr>
                        <th>Model</th>
                        <td>{hardware.model}</td>
                    </tr>
                    <tr>
                        <th>Nodes</th>
                        <td>{hardware.nodes}</td>
                    </tr>
                    <tr>
                        <th>CPU</th>
                        <td>{hardware.cpu}</td>
                    </tr>
                    <tr>
                        <th>Memory</th>
                        <td>{hardware.mem}</td>
                    </tr>
                    <tr>
                        <th>Storage</th>
                        <td>{hardware.storage}</td>
                    </tr>
                    <tr>
                        <th>GPU</th>
                        <td>{gpu.name}</td>
                    </tr>
                    <tr>
                        <th>GPU Memory</th>
                        <td>{gpu.mem}</td>
                    </tr>
                    <tr>
                        <th>Number of GPUs</th>
                        <td>{gpu.count}</td>
                    </tr>
                    <tr>
                        <th>GPUs/Node</th>
                        <td>{gpu.nodecount}</td>
                    </tr>
                </tbody >
            </Table>
        )
        return (
            <div> {items} </div>
        );
    }
}

class SoftwareView extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let executor = this.props.executor
        let software = {}
        let gpu = {}
        if (Object.keys(executor).length > 0 && executor.constructor === Object) {
            software = executor.capabilities.software
        }

        const items = []
        items.push(
            <Table striped bordered hover >
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{software.name}</td>
                    </tr>
                    <tr>
                        <th>Type</th>
                        <td>{software.type}</td>
                    </tr>
                    <tr>
                        <th>Version</th>
                        <td>{software.version}</td>
                    </tr>
                </tbody >
            </Table>
        )
        return (
            <div> {items} </div>
        );
    }
}



class Page extends Component {
    constructor() {
        super();
        this.state = {
            executor: {},
        };
    }

    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let executorname = params.get('executorname');

        let api = global.colonies
        api.load().then(() => {
            api.getExecutor(global.colonyName, executorname, global.executorPrvKey).then((executor) => {
                this.setState({ executor: executor })
            })
            this.interval = setInterval(() => {
                api.getExecutor(executorname, global.executorPrvKey).then((executor) => {
                    this.setState({ executor: executor })
                })
            }, 60000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let props = this.props
        const { executor } = this.state
        return (
            <div>
                <ContentHeader title="Executor" />
                <section className="content">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="table-header">Information</h3>
                                <div className="card-body">
                                    <ExecutorView executor={executor} navigate={props.navigate} />
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="table-header">Hardware</h3>
                                <div className="card-body">
                                    <HardwareView executor={executor} navigate={props.navigate} />
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="table-header">Software</h3>
                                <div className="card-body">
                                    <SoftwareView executor={executor} navigate={props.navigate} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const PageWithNavigate = () => {
    const navigate = useNavigate();
    return (
        <Page navigate={navigate} />
    )
}


export default PageWithNavigate;
