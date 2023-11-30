/* eslint-disable jsx-a11y/anchor-is-valid */
import { ContentHeader } from '@components';
import React, { Component } from "react"
import { global } from '../global'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class Page extends Component {
    constructor() {
        super();
        this.state = {
            snapshots: {}
        };
    }

    componentDidMount() {
        let api = global.colonies
        api.load().then(() => {
            api.getSnapshots(global.colonyName, global.executorPrvKey).then((snapshots) => {
                console.log(snapshots)
                this.setState({ snapshots: snapshots })
            })
            // this.interval = setInterval(() => {
            //     api.getLog(processid, since, global.executorPrvKey).then((logs) => {
            //         if (logs != null) {
            //             for (let log of logs) {
            //                 if (log.timestamp > since) {
            //                     allLogs += log.message;
            //                     since = log.timestamp
            //                     this.setState({ logs: allLogs, processid: processid })
            //                 }
            //             }
            //         }
            //     })
            // }, 60000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let props = this.props
        const Trigger = (snapshotid) => {
            props.navigate("/snapshot?snapshotid=" + snapshotid)
        }
        const { snapshots } = this.state;
        const items = []
        if (snapshots == null) {
            return (<h5>No snapshots found</h5>)
        }

        for (let i = 0; i < snapshots.length; i++) {
            let snapshot = snapshots[i]

            items.push(<tr onClick={() => { Trigger(snapshot.snapshotid) }}>
                <td> <i class="fas fa-layer-group"></i> &nbsp; {snapshot.name}</td>
                <td> {snapshot.label}</td>
            </tr>)
        }

        return (
            <div>
                <div style={{ textAlign: 'right' }}>
                </div>
                <div className="card-body">
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Snapshot Id</th>
                                <th>Label</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </Table >
                </div>
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
