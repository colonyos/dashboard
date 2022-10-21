/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import React, { Component } from "react"
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { bool2str } from '@app/utils/helpers';
import { state2str } from '@app/utils/helpers';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { PfImage } from '@profabric/react-components';

const StyledContentImage = styled(PfImage)`
  display: inline-block;
  margin-left: 5px;
  &:first-child {
    margin-left: 0;
  }
`;


class ProcessSpecView extends Component {
    constructor() {
        super();
        this.state = {
            process: { spec: {} },
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

    render() {
        let props = this.props
        const Trigger = (processid) => {
            props.navigate("/process?processid=" + processid)
        }

        const { process } = this.state
        return (
            <Table striped bordered hover >
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{process.spec.name}</td>
                    </tr>
                    <tr>
                        <th>Function</th>
                        <td>{process.spec.func}</td>
                    </tr>
                    <tr>
                        <th>Argument</th>
                        <td>{process.spec.args}</td>
                    </tr>
                    <tr>
                        <th>Max Exec Time</th>
                        <td>{process.spec.maxexectime}</td>
                    </tr>
                    <tr>
                        <th>Max Wait Time</th>
                        <td>{process.spec.maxwaittime}</td>
                    </tr>
                    <tr>
                        <th>Max Retries</th>
                        <td>{process.spec.maxretries}</td>
                    </tr>
                </tbody>
            </Table >
        );
    }
}

class ProcessView extends Component {
    constructor() {
        super();
        this.state = {
            process: { spec: {} },
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

    render() {
        let props = this.props
        const Trigger = (processid) => {
            props.navigate("/process?processid=" + processid)
        }

        const { process } = this.state
        return (
            <Table striped bordered hover >
                <tbody>
                    <tr>
                        <th>ProcessId</th>
                        <td>{process.processid}</td>
                    </tr>
                    <tr>
                        <th>Input</th>
                        <td>{process.input}</td>
                    </tr>
                    <tr>
                        <th>Output</th>
                        <td>{process.output}</td>
                    </tr>
                    <tr>
                        <th>Assigned RuntimeId</th>
                        <td>{process.assignedruntimeid}</td>
                    </tr>
                    <tr>
                        <th>Assigned</th>
                        <td>{bool2str(process.isassigned)}</td>
                    </tr>
                    <tr>
                        <th>State</th>
                        <td>{state2str(process.state)}</td>
                    </tr>
                    <tr>
                        <th>Wait Deadline</th>
                        <td>{process.waitdeadline}</td>
                    </tr>
                    <tr>
                        <th>Execution Deadline</th>
                        <td>{process.execdeadline}</td>
                    </tr>
                    <tr>
                        <th>Retries</th>
                        <td>{process.retries}</td>
                    </tr>
                    <tr>
                        <th>Waiting for Parents</th>
                        <td>{bool2str(process.waitforparents)}</td>
                    </tr>
                </tbody>
            </Table >
        );
    }
}

const TimelineTab = ({ isActive }: { isActive: boolean }) => {
    return (
        <div className={`tab-pane ${isActive ? 'active' : ''}`}>
            <div className="timeline timeline-inverse">
                <div className="time-label">
                    <span className="bg-info">10 Feb. 2014</span>
                </div>
                <div>
                    <i className="fas fa-microchip bg-primary" />
                    <div className="timeline-item">
                        <span className="time">
                            <i className="far fa-clock" />
                            <span> 12:05</span>
                        </span>
                        <h3 className="timeline-header">
                            Process specifcation submitted by worker
                        </h3>
                        <div className="timeline-body">
                            4eff750a73b91d4f449e2e9932640c4352c842e6514c023870f79046c4e81dcd
                        </div>
                    </div>
                </div>

                <div>
                    <i className="fas fa-microchip bg-primary" />
                    <div className="timeline-item">
                        <span className="time">
                            <i className="far fa-clock" />
                            <span> 12:05</span>
                        </span>
                        <h3 className="timeline-header">
                            Assigned to worker
                        </h3>
                        <div className="timeline-body">
                            4eff750a73b91d4f449e2e9932640c4352c842e6514c023870f79046c4e81dcd
                        </div>
                    </div>
                </div>

                <div>
                    <i className="fas fa-microchip bg-primary" />
                    <div className="timeline-item">
                        <span className="time">
                            <i className="far fa-clock" />
                            <span> 12:05</span>
                        </span>
                        <h3 className="timeline-header">
                            Process closed as Successful
                        </h3>
                    </div>
                </div>


                <div className="time-label">
                    <span className="bg-success">3 Jan. 2014</span>
                </div>
                <div>
                    <i className="far fa-clock bg-gray" />
                </div>
            </div>
        </div>
    );
};


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
                        <div className="card-header">
                            <h3 className="table-header">Timeline</h3>
                            <div className="card-body">
                                <TimelineTab processid={processid} />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="table-header">Process Specifcation</h3>
                            <div className="card-body">
                                <ProcessSpecView processid={processid} />
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3 className="table-header">Process State Information</h3>
                            <div className="card-body">
                                <ProcessView processid={processid} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;
