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
            files: {}, label: ""
        };
    }

    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let label = params.get('label');

        console.log(label)

        let api = global.colonies
        api.load().then(() => {
            api.getFiles(global.colonyName, label, global.executorPrvKey).then((files) => {
                console.log(files)
                this.setState({ files: files, label: label })
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
        const Trigger = (name) => {
            props.navigate("/file?name=" + name + "&label=" + label)
        }
        const TriggerBack = () => {
            props.navigate("/filesystem")
        }
        const { files, label } = this.state;
        const items = []
        if (files == null) {
            return (<h5>No files found</h5>)
        }

        for (let i = 0; i < files.length; i++) {
            let file = files[i]

            items.push(<tr key={process.processid} onClick={() => { Trigger(file.name) }}>
                <td>  <i class="fas fa-file"></i> &nbsp; {file.name}</td>
            </tr>)
        }

        return (
            <div>
                <div style={{ textAlign: 'right' }}>
                    <Button variant="secondary" onClick={(e) => TriggerBack()}>
                        Back
                    </Button>
                </div>
                <div className="card-body">
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Name</th>
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
