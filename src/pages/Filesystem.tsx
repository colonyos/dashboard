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
            log: {}, processid: ""
        };
    }

    componentDidMount() {
        let api = global.colonies
        api.load().then(() => {
            api.getFileLabels(global.colonyName, global.executorPrvKey).then((labels) => {
                console.log(labels)
                this.setState({ labels: labels })
                // if (logs != null) {
                // }
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
        const Trigger = (label_name) => {
            props.navigate("/files?label=" + label_name)
        }
        const { labels } = this.state;
        const items = []
        if (labels == null) {
            return (<h5>No labels found</h5>)
        }

        for (let i = 0; i < labels.length; i++) {
            let label = labels[i]

            items.push(<tr key={process.processid} onClick={() => { Trigger(label.name) }}>
                <td>  <i class="fas fa-folder"></i> &nbsp; {label.name}</td>
                <td> {label.files}</td>
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
                                <th>Name</th>
                                <th>File Revisions</th>
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
