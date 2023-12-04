/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import React, { Component } from "react"
import { global } from '../global'
import Table from 'react-bootstrap/Table';
import { bool2str } from '@app/utils/helpers';
import { state2str } from '@app/utils/helpers';
import { attrtype2str } from '@app/utils/helpers';
import { parseTime } from '@app/utils/helpers';
import { parseDict } from '@app/utils/helpers';
import { parseArr } from '@app/utils/helpers';
import { calcExecTime } from '@app/utils/helpers';
import { calcWaitTime } from '@app/utils/helpers';
import { calcRemainingTime } from '@app/utils/helpers';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const TimelineView = (props, { isActive }: { isActive: boolean }) => {
    const items = []
    const endItem = []
    let process = props.process

    let submissionTime = Date.parse(process.submissiontime)
    if (submissionTime > 0) {
        items.push(
            <div>
                <i className="fas fa-file bg-info" />
                <div className="timeline-item">
                    <span className="time">
                        <i className="far fa-clock" />
                        <span> {parseTime(process.submissiontime)}</span>
                    </span>
                    <h3 className="timeline-header">
                        <b>Function specification submitted</b>
                    </h3>
                </div>
            </div>
        )
    }

    if (process.isassigned) {
        items.push(
            <div>
                <i className="fas fa-microchip bg-primary" />
                <div className="timeline-item">
                    <span className="time">
                        <i className="far fa-clock" />
                        <span> {parseTime(process.starttime)}</span>
                    </span>
                    <h3 className="timeline-header">
                        <b>Assigned to executor</b>
                    </h3>
                    <div className="timeline-body">
                        <b>ExecutorId:</b> {process.assignedexecutorid}
                    </div>
                </div>
            </div>
        )
    }

    let endTime = Date.parse(process.endtime)
    if (endTime > 0 && process.state == 2) {
        items.push(
            <div>
                <i className="fas fa-check bg-success" />
                <div className="timeline-item">
                    <span className="time">
                        <i className="far fa-clock" />
                        <span> {parseTime(process.starttime)}</span>
                    </span>
                    <h3 className="timeline-header">
                        <b>Process closed as successful</b>
                    </h3>
                </div>
            </div>
        )
        endItem.push(
            <div className="time-label">
                <span className="bg-success">{parseTime(process.endtime)}</span>
            </div>
        )
    } else if (endTime > 0 && process.state == 3) {
        items.push(
            <div>
                <i className="fas fa-skull-crossbones bg-danger" />
                <div className="timeline-item">
                    <span className="time">
                        <i className="far fa-clock" />
                        <span> {parseTime(process.endtime)}</span>
                    </span>
                    <h3 className="timeline-header">
                        <b>Process closed as failed</b>
                    </h3>
                </div>
            </div>
        )
        endItem.push(
            <div className="time-label">
                <span className="bg-danger">{parseTime(process.endtime)}</span>
            </div>
        )
    }

    return (
        <div className={`tab-pane ${isActive ? 'active' : ''}`}>
            <div className="timeline timeline-inverse">
                <div className="time-label">
                    <span className="bg-info">{parseTime(process.submissiontime)}</span>
                </div>

                {items}
                {endItem}

                <div>
                    <i className="far fa-clock bg-gray" />
                </div>
            </div>
        </div>
    );
};

class FunctionSpecView extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let process = this.props.process
        return (
            <Table striped bordered hover >
                <tbody>
                    <tr>
                        <th>Function Name</th>
                        <td>{process.spec.funcname}</td>
                    </tr>
                    <tr>
                        <th>Arguments</th>
                        <td>{parseArr(process.spec.args)}</td>
                    </tr>
                    <tr>
                        <th>Keyword Arguments</th>
                        <td>{JSON.stringify(process.spec.kwargs, null, ' ')}</td>
                    </tr>
                    <tr>
                        <th>Node Name</th>
                        <td>{process.spec.nodename}</td>
                    </tr>
                    <tr>
                        <th>Priority</th>
                        <td>{process.spec.priority}</td>
                    </tr>
                    <tr>
                        <th>MaxExecTime</th>
                        <td>{process.spec.maxexectime} seconds</td>
                    </tr>
                    <tr>
                        <th>MaxWaitTime</th>
                        <td>{process.spec.maxwaittime} seconds</td>
                    </tr>
                    <tr>
                        <th>Max Retries</th>
                        <td>{process.spec.maxretries}</td>
                    </tr>
                    <tr>
                        <th>Priority</th>
                        <td>{process.spec.priority}</td>
                    </tr>
                    <tr>
                        <th>Label</th>
                        <td>{process.spec.label}</td>
                    </tr>
                    <tr>
                        <th>Environment</th>
                        <td>{parseDict(process.spec.env)}</td>
                    </tr>
                </tbody>
            </Table >
        );
    }
}

class ConditionsView extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let process = this.props.process
        let gpu = { count: 0, mem: 0 }
        if (Object.keys(process).length > 2 && process.constructor === Object) {
            gpu = process.spec.conditions
        }

        return (
            <Table striped bordered hover >
                <tbody>
                    <tr>
                        <th>Colony Id</th>
                        <td>{process.spec.conditions.colonyname}</td>
                    </tr>
                    <tr>
                        <th>Executor Type</th>
                        <td>{process.spec.conditions.executortype}</td>
                    </tr>
                    <tr>
                        <th>Executor Ids</th>
                        <td>{process.spec.conditions.executorids}</td>
                    </tr>
                    <tr>
                        <th>Dependencies</th>
                        <td>{process.spec.conditions.dependencies}</td>
                    </tr>
                    <tr>
                        <th>Walltime</th>
                        <td>{gpu.walltime} seconds</td>
                    </tr>
                    <tr>
                        <th>Nodes</th>
                        <td>{process.spec.conditions.nodes}</td>
                    </tr>
                    <tr>
                        <th>CPU</th>
                        <td>{process.spec.conditions.cpu}</td>
                    </tr>
                    <tr>
                        <th>Processes</th>
                        <td>{process.spec.conditions.processes}</td>
                    </tr>
                    <tr>
                        <th>Process/Node</th>
                        <td>{process.spec.conditions.processes_per_node}</td>
                    </tr>
                    <tr>
                        <th>Memory</th>
                        <td>{process.spec.conditions.memory}</td>
                    </tr>
                    <tr>
                        <th>Storage</th>
                        <td>{process.spec.conditions.storage}</td>
                    </tr>
                    <tr>
                        <th>GPUs</th>
                        <td>{gpu.count}</td>
                    </tr>
                    <tr>
                        <th>GPU Memory</th>
                        <td>{gpu.mem}</td>
                    </tr>
                </tbody>
            </Table >
        );
    }
}

class ProcessView extends Component {
    constructor() {
        super();
    }

    render() {
        let props = this.props

        const Trigger = (workflowid) => {
            props.navigate("/workflow?workflowid=" + workflowid)
        }

        let process = this.props.process

        console.log(process.out)

        return (
            <Table striped bordered hover >
                <tbody>
                    <tr>
                        <th>Process Id</th>
                        <td>{process.processid}</td>
                    </tr>
                    <tr>
                        <th>Initiator Id</th>
                        <td>{process.initiatorid}</td>
                    </tr>
                    <tr>
                        <th>Initiator Name</th>
                        <td>{process.initiatorname}</td>
                    </tr>
                    <tr onClick={() => { Trigger(process.processgraphid) }}>
                        <th>ProcessGraph Id</th>
                        <td>{process.processgraphid}</td>
                    </tr>
                    <tr>
                        <th>Children</th>
                        <td>{JSON.stringify(process.children, null, ' ')}</td>
                    </tr>
                    <tr>
                        <th>Input</th>
                        <td>{JSON.stringify(process.in, null, ' ')}</td>
                    </tr>
                    <tr>
                        <th>Output</th>
                        <td>{JSON.stringify(process.out, null, ' ')}</td>
                    </tr>
                    <tr>
                        <th>Errors</th>
                        <td>{process.errors}</td>
                    </tr>
                    <tr>
                        <th>Assigned</th>
                        <td>{bool2str(process.isassigned)}</td>
                    </tr>
                    <tr>
                        <th>Assigned Executor Id</th>
                        <td>{process.assignedexecutorid}</td>
                    </tr>
                    <tr>
                        <th>State</th>
                        <td>{state2str(process.state)}</td>
                    </tr>
                    <tr>
                        <th>Submission Time</th>
                        <td>{parseTime(process.submissiontime)}</td>
                    </tr>
                    <tr>
                        <th>Start Time</th>
                        <td>{parseTime(process.starttime)}</td>
                    </tr>
                    <tr>
                        <th>End Time</th>
                        <td>{parseTime(process.endtime)}</td>
                    </tr>
                    <tr>
                        <th>Waiting Time</th>
                        <td>{calcWaitTime(process.state, process.submissiontime, process.starttime, process.endtime)} seconds</td>
                    </tr>
                    <tr>
                        <th>Wait Deadline</th>
                        <td>{parseTime(process.waitdeadline)}</td>
                    </tr>
                    <tr>
                        <th>Remaining Waiting Time</th>
                        <td>{calcRemainingTime(process.state, 0, process.waitdeadline)} seconds</td>
                    </tr>
                    <tr>
                        <th>Execution Time</th>
                        <td>{calcExecTime(process.state, process.starttime, process.endtime)} seconds</td>
                    </tr>
                    <tr>
                        <th>Remaining Execution Time</th>
                        <td>{calcRemainingTime(process.state, 1, process.execdeadline)} seconds</td>
                    </tr>
                    <tr>
                        <th>Execution Deadline</th>
                        <td>{parseTime(process.execdeadline)}</td>
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

class AttributeView extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let process = this.props.process

        const items = []
        if (process.attributes.length > 0) {
            for (let i in process.attributes) {
                let attr = process.attributes[i]
                items.push(
                    <Table striped bordered hover >
                        <tbody>
                            <tr>
                                <th>Key</th>
                                <td>{attr.key}</td>
                            </tr>
                            <tr>
                                <th>Value</th>
                                <td>{attr.value}</td>
                            </tr>
                            <tr>
                                <th>Attribute Type</th>
                                <td>{attrtype2str(attr.attributetype)}</td>
                            </tr>
                            <tr>
                                <th>Attribute Id</th>
                                <td>{attr.attributeid}</td>
                            </tr>
                            <tr>
                                <th>Target Process Id</th>
                                <td>{attr.targetid}</td>
                            </tr>
                            <tr>
                                <th>Target Colony Id</th>
                                <td>{attr.targetcolonyname}</td>
                            </tr>
                            <tr>
                                <th>Target ProcessGraph Id</th>
                                <td>{attr.targetprocessgraphid}</td>
                            </tr>
                        </tbody >
                    </Table>
                )
            }
            return (
                <div> {items} </div>
            );
        } else {
            return (
                <h5>No attributes found</h5>
            )
        }
    }
}

class Page extends Component {
    constructor() {
        super();
        this.state = {
            process: { attributes: {}, spec: { conditions: {} } },
        };
    }

    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let processid = params.get('processid');

        let api = global.colonies
        api.load().then(() => {
            api.getProcess(processid, global.executorPrvKey).then((process) => {
                this.setState({ process: process })
            })
            this.interval = setInterval(() => {
                api.getProcess(processid, global.executorPrvKey).then((process) => {
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
        const { process } = this.state
        const TriggerLog = (processid) => {
            props.navigate("/log?processid=" + processid)
        }
        return (
            <div>
                <ContentHeader title="Process" />
                <section className="content">
                    <div className="container-fluid">

                        <div className="card">
                            <div className="card-header">
                                <div style={{ textAlign: 'right' }}>
                                    <Button variant="secondary" onClick={(e) => TriggerLog(process.processid)}>
                                        Logs
                                    </Button>
                                </div>
                                <h3 className="table-header">Timeline</h3>
                                <div className="card-body">
                                    <TimelineView process={process} navigate={props.navigate} />
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="table-header">Function Specifcation</h3>
                                <div className="card-body">
                                    <FunctionSpecView process={process} navigate={props.navigate} />
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3 className="table-header">Conditions</h3>
                                <div className="card-body">
                                    <ConditionsView process={process} navigate={props.navigate} />
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3 className="table-header">Process Information</h3>
                                <div className="card-body">
                                    <ProcessView process={process} navigate={props.navigate} />
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3 className="table-header">Attributes</h3>
                                <div className="card-body">
                                    <AttributeView process={process} navigate={props.navigate} />
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
